import applicationMongoRepository from './application.mongo.repository.js';
import userRepository from '../auth/repository/user.repository.js';
import jobMongoRepository from '../jobs/repositories/job.mongo.repository.js';
import { canTransitionStatus } from './application.utils.js';
import applicationEvents from './application.events.js';
import { ApplicationMapper } from './application.mapper.js';
import { 
  ApplicationAlreadyExistsError, 
  ResumeMissingError, 
  JobClosedError, 
  InvalidStatusTransitionError, 
  WithdrawalNotAllowedError, 
  ApplicationNotFoundError, 
  UnauthorizedEmployerError 
} from './application.errors.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../utils/errors.js';

class ApplicationService {
  /**
   * Seeker submits a new job application.
   */
  async applyJob(userId, payload) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User profile not found');
    }
    // Verify seeker has uploaded a resume PDF
    if (!user.resumeUrl) {
      throw new ResumeMissingError('Please upload a PDF resume before submitting applications.');
    }

    const job = await jobMongoRepository.findById(payload.jobId);
    if (!job) {
      throw new NotFoundError('Target job listing not found');
    }
    if (job.status !== 'open' || job.isDeleted) {
      throw new JobClosedError('This job listing is no longer open to applications.');
    }
    // Check for expiration
    if (job.applicationDeadline && new Date(job.applicationDeadline) <= new Date()) {
      throw new JobClosedError('Applications are closed because the deadline has expired.');
    }

    // Seeker cannot apply to their own posting
    const postedById = job.postedBy?._id?.toString() || job.postedBy?.toString();
    if (postedById === userId) {
      throw new ForbiddenError('You cannot apply to your own job listing.');
    }

    // Prevent duplicate active applications
    const alreadyApplied = await applicationMongoRepository.exists(userId, payload.jobId);
    if (alreadyApplied) {
      throw new ApplicationAlreadyExistsError('You have already applied for this job listing.');
    }

    const newApp = await applicationMongoRepository.create({
      applicantId: userId,
      jobId: payload.jobId,
      employerId: postedById,
      resumeUrl: user.resumeUrl,
      coverLetter: payload.coverLetter || '',
      status: 'APPLIED',
      appliedAt: new Date()
    });

    // Increment job's total applications metric
    await jobMongoRepository.incrementApplications(payload.jobId);

    applicationEvents.emitCreated(newApp);

    return ApplicationMapper.toDetailDTO(newApp);
  }

  /**
   * Retrieve single application detail with ownership checks.
   */
  async getApplication(applicationId, userId, role) {
    const app = await applicationMongoRepository.findById(applicationId);
    if (!app || app.withdrawn) {
      throw new ApplicationNotFoundError();
    }

    const isApplicant = app.applicantId?._id?.toString() === userId || app.applicantId?.toString() === userId;
    const isEmployer = app.employerId?.toString() === userId;
    const isAdmin = role === 'admin';

    if (!isApplicant && !isEmployer && !isAdmin) {
      throw new ForbiddenError('You are not authorized to view this application.');
    }

    if (isEmployer || isAdmin) {
      return ApplicationMapper.toEmployerDTO(app);
    }
    return ApplicationMapper.toDetailDTO(app);
  }

  /**
   * Retrieve paginated applications submitted by the logged-in seeker.
   */
  async getMyApplications(userId, queryParams) {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const skip = (page - 1) * limit;

    const { items, total } = await applicationMongoRepository.findByApplicant(userId, {
      skip,
      limit,
      status: queryParams.status
    });

    return ApplicationMapper.toPaginatedDTOList(
      items, 
      total, 
      page, 
      limit, 
      ApplicationMapper.toDTO
    );
  }

  /**
   * Retrieve candidate applications for a specific job (Employer dashboard).
   */
  async getApplicantsForJob(jobId, userId, role, queryParams) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Target job listing not found');
    }

    const postedById = job.postedBy?._id?.toString() || job.postedBy?.toString();
    const isOwner = postedById === userId;
    const isAdmin = role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError('Access Denied. You do not own this job listing.');
    }

    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const skip = (page - 1) * limit;

    const { items, total } = await applicationMongoRepository.findByJob(jobId, {
      skip,
      limit,
      status: queryParams.status
    });

    return ApplicationMapper.toPaginatedDTOList(
      items, 
      total, 
      page, 
      limit, 
      ApplicationMapper.toEmployerDTO
    );
  }

  /**
   * Employer or admin transitions candidate status.
   */
  async updateStatus(applicationId, userId, role, targetStatus, notes) {
    const app = await applicationMongoRepository.findById(applicationId);
    if (!app || app.withdrawn) {
      throw new ApplicationNotFoundError();
    }

    const isOwner = app.employerId?.toString() === userId;
    const isAdmin = role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError('Access Denied. You do not own this job listing.');
    }

    // Enforce transition logic matrix
    if (!canTransitionStatus(app.status, targetStatus)) {
      throw new InvalidStatusTransitionError(`Cannot transition status from ${app.status} to ${targetStatus}`);
    }

    const updateFields = { status: targetStatus };
    if (notes !== undefined) {
      updateFields.notes = notes;
    }
    // Update timestamp when first moved under review
    if (app.status === 'APPLIED') {
      updateFields.reviewedAt = new Date();
    }

    const updatedApp = await applicationMongoRepository.update(applicationId, updateFields);
    
    applicationEvents.emitStatusUpdated(updatedApp);

    return ApplicationMapper.toEmployerDTO(updatedApp);
  }

  /**
   * Seeker withdraws application.
   */
  async withdrawApplication(applicationId, userId) {
    const app = await applicationMongoRepository.findById(applicationId);
    if (!app || app.withdrawn) {
      throw new ApplicationNotFoundError();
    }

    const isApplicant = app.applicantId?._id?.toString() === userId || app.applicantId?.toString() === userId;
    if (!isApplicant) {
      throw new ForbiddenError('You are not authorized to withdraw this application.');
    }

    // Seeker can only withdraw when the status is APPLIED (has not moved to review/screening)
    if (app.status !== 'APPLIED') {
      throw new WithdrawalNotAllowedError('Withdrawal locked once application moves under review.');
    }

    const withdrawnApp = await applicationMongoRepository.softWithdraw(applicationId);

    applicationEvents.emitWithdrawn(withdrawnApp);

    return true;
  }
}

export default new ApplicationService();
