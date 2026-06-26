import jobMongoRepository from '../repositories/job.mongo.repository.js';
import { JOB_STATUS, ALLOWED_STATUS_TRANSITIONS } from '../constants/job.constants.js';
import jobEvents from '../events/job.events.js';
import { 
  toEmployerJobDTO, 
  toJobDetailDTO, 
  toPaginatedJobListDTO, 
  toAdminJobDTO 
} from '../dto/job.dto.js';
import { BadRequestError, NotFoundError } from '../../../utils/errors.js';
import Job from '../models/job.model.js';

class JobService {
  /**
   * Helper to validate if status transition is allowed
   */
  _validateStatusTransition(currentStatus, targetStatus) {
    const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new BadRequestError(`Invalid status transition from ${currentStatus} to ${targetStatus}`);
    }
  }

  /**
   * Creates a new job posting. Status defaults to DRAFT or OPEN.
   */
  async createJob(jobData, userId) {
    // Normalize skills
    if (jobData.skillsRequired) {
      jobData.skillsRequired = this.normalizeSkills(jobData.skillsRequired);
    }
    
    // Normalize benefits
    if (jobData.benefits) {
      jobData.benefits = this.normalizeBenefits(jobData.benefits);
    }

    const payload = {
      ...jobData,
      postedBy: userId,
      status: jobData.status || JOB_STATUS.DRAFT
    };

    const newJob = await jobMongoRepository.create(payload);
    jobEvents.emitJobCreated(newJob);

    if (newJob.status === JOB_STATUS.OPEN) {
      jobEvents.emitJobPublished(newJob);
    }

    return toEmployerJobDTO(newJob);
  }

  /**
   * Updates an existing job posting (only allowed fields)
   */
  async updateJob(jobId, updateData) {
    if (updateData.skillsRequired) {
      updateData.skillsRequired = this.normalizeSkills(updateData.skillsRequired);
    }
    
    if (updateData.benefits) {
      updateData.benefits = this.normalizeBenefits(updateData.benefits);
    }

    // Block manual state/status edits via update profile details
    delete updateData.status;
    delete updateData.isDeleted;
    delete updateData.postedBy;

    const updatedJob = await jobMongoRepository.update(jobId, updateData);
    if (!updatedJob) {
      throw new NotFoundError('Job listing not found');
    }

    jobEvents.emitJobUpdated(updatedJob);
    return toEmployerJobDTO(updatedJob);
  }

  /**
   * Transition draft job to open status
   */
  async publishJob(jobId) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    this._validateStatusTransition(job.status, JOB_STATUS.OPEN);

    // Enforce deadline check on publication
    if (new Date(job.applicationDeadline) <= new Date()) {
      throw new BadRequestError('Cannot publish job with a deadline in the past');
    }

    const updatedJob = await jobMongoRepository.update(jobId, { status: JOB_STATUS.OPEN });
    jobEvents.emitJobPublished(updatedJob);

    return toEmployerJobDTO(updatedJob);
  }

  /**
   * Transition active job to closed status
   */
  async closeJob(jobId) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    this._validateStatusTransition(job.status, JOB_STATUS.CLOSED);

    const updatedJob = await jobMongoRepository.update(jobId, { status: JOB_STATUS.CLOSED });
    jobEvents.emitJobClosed(updatedJob);

    return toEmployerJobDTO(updatedJob);
  }

  /**
   * Reopen a closed or expired job with a fresh deadline
   */
  async reopenJob(jobId, applicationDeadline) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    this._validateStatusTransition(job.status, JOB_STATUS.OPEN);

    const updatedJob = await jobMongoRepository.update(jobId, {
      status: JOB_STATUS.OPEN,
      applicationDeadline
    });
    jobEvents.emitJobPublished(updatedJob);

    return toEmployerJobDTO(updatedJob);
  }

  /**
   * Perform soft deletion of job record
   */
  async deleteJob(jobId, userId) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    const deletedJob = await jobMongoRepository.softDelete(jobId, userId);
    jobEvents.emitJobDeleted(jobId, userId);
    return true;
  }

  /**
   * Fetches public or owner detailed job listing. Increments view metrics.
   */
  async getJob(jobId, userId = null) {
    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    // Seeker or Guest viewing the profile increments analytics counter
    const isOwner = job.postedBy?._id?.toString() === userId || job.postedBy?.toString() === userId;
    if (!isOwner) {
      await jobMongoRepository.incrementViews(jobId);
      job.viewsCount += 1;
    }

    return toJobDetailDTO(job);
  }

  /**
   * Search filter wrapper returning seeker paginated listings
   */
  async getPublicJobs(filters, options) {
    const { items, totalCount } = await jobMongoRepository.findPublicJobs(filters, options);
    return toPaginatedJobListDTO(items, totalCount, options.page, options.limit, toJobDetailDTO);
  }

  /**
   * Retrieve list of jobs posted by the employer caller
   */
  async getEmployerJobs(employerId, options) {
    const { items, totalCount } = await jobMongoRepository.findByEmployer(employerId, options);
    return toPaginatedJobListDTO(items, totalCount, options.page, options.limit, toEmployerJobDTO);
  }

  /**
   * Admin audit search list (shows soft-deleted and all states)
   */
  async adminGetJobs(options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const items = await Job.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('postedBy', 'firstName lastName email');

    const totalCount = await Job.countDocuments({});
    return toPaginatedJobListDTO(items, totalCount, page, limit, toAdminJobDTO);
  }

  /**
   * Normalizes skill chips: lowercase, trim, deduplicate, limit to 20
   */
  normalizeSkills(skills) {
    if (!Array.isArray(skills)) return [];
    const seen = new Set();
    const result = [];
    for (const skill of skills) {
      if (typeof skill !== 'string') continue;
      const clean = skill.trim().toLowerCase();
      if (clean && !seen.has(clean)) {
        seen.add(clean);
        // Capitalize for display compatibility
        result.push(skill.trim());
      }
      if (result.length >= 20) break;
    }
    return result;
  }

  /**
   * Normalizes benefits array
   */
  normalizeBenefits(benefits) {
    if (!Array.isArray(benefits)) return [];
    return benefits
      .map(b => (typeof b === 'string' ? b.trim() : ''))
      .filter(Boolean);
  }
}

export default new JobService();
