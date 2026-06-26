import Job from '../models/job.model.js';
import IJobRepository from './job.repository.js';
import { JOB_STATUS } from '../constants/job.constants.js';

class JobMongoRepository extends IJobRepository {
  /**
   * Save a new job document in the database
   */
  async create(jobData) {
    const job = new Job(jobData);
    return await job.save();
  }

  /**
   * Find a single active, non-deleted job by unique ID
   */
  async findById(id) {
    return await Job.findOne({ _id: id, isDeleted: false }).populate('postedBy', 'firstName lastName email');
  }

  /**
   * Retrieve list of jobs posted by an employer (includes drafts, closed, etc.)
   */
  async findByEmployer(employerId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const query = { postedBy: employerId, isDeleted: false };
    const items = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Job.countDocuments(query);
    return { items, totalCount };
  }

  /**
   * General search and filter public jobs list
   */
  async findPublicJobs(filters = {}, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    // Base query only returns published, non-deleted, open listings
    const query = { 
      status: JOB_STATUS.OPEN, 
      isDeleted: false 
    };

    // Keyword text search
    if (filters.keyword) {
      query.$text = { $search: filters.keyword };
    }

    // Location match
    if (filters.location) {
      query.location = { $regex: new RegExp(filters.location, 'i') };
    }

    // Job Type match
    if (filters.jobType) {
      query.jobType = filters.jobType;
    }

    // Experience Level match
    if (filters.experienceLevel) {
      query.experienceLevel = filters.experienceLevel;
    }

    // Salary Min match
    if (filters.salaryMin !== undefined) {
      query.salaryMin = { $gte: filters.salaryMin };
    }

    // Skills match (all listed skills should be in requirements)
    if (filters.skills) {
      const skillsArray = filters.skills.split(',').map(s => new RegExp(s.trim(), 'i'));
      query.skillsRequired = { $in: skillsArray };
    }

    // Execute queries
    const items = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('postedBy', 'firstName lastName email');

    const totalCount = await Job.countDocuments(query);
    return { items, totalCount };
  }

  /**
   * Update fields of a job by ID
   */
  async update(id, updateData) {
    return await Job.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  /**
   * Perform soft deletion updates on a job listing
   */
  async softDelete(id, deletedBy) {
    return await Job.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { 
        $set: { 
          isDeleted: true,
          status: JOB_STATUS.DELETED,
          deletedAt: new Date(),
          deletedBy
        } 
      },
      { new: true }
    );
  }

  /**
   * Safely increments viewsCount analytics
   */
  async incrementViews(id) {
    return await Job.findByIdAndUpdate(
      id,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
  }

  /**
   * Safely increments totalApplications analytics
   */
  async incrementApplications(id) {
    return await Job.findByIdAndUpdate(
      id,
      { $inc: { totalApplications: 1 } },
      { new: true }
    );
  }

  /**
   * Find all jobs past their deadline that are still open
   */
  async findExpiredJobs(date = new Date()) {
    return await Job.find({
      status: JOB_STATUS.OPEN,
      isDeleted: false,
      applicationDeadline: { $lt: date }
    }).select('_id');
  }

  /**
   * Bulk transition jobs to expired state
   */
  async bulkExpireJobs(jobIds) {
    if (!jobIds || jobIds.length === 0) return { modifiedCount: 0 };
    return await Job.updateMany(
      { _id: { $in: jobIds } },
      { $set: { status: JOB_STATUS.EXPIRED } }
    );
  }

  /**
   * Checks if a job exists by ID
   */
  async exists(id) {
    const job = await Job.findOne({ _id: id, isDeleted: false }).select('_id');
    return !!job;
  }
}

export default new JobMongoRepository();
