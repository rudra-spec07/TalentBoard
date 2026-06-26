import jobMongoRepository from '../repositories/job.mongo.repository.js';
import { NotFoundError, ForbiddenError } from '../../../utils/errors.js';

/**
 * Express middleware to verify job ownership.
 * Populates req.job to prevent duplicate database calls in controllers.
 */
const verifyJobOwnership = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return next();
    }

    const job = await jobMongoRepository.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job listing not found');
    }

    // Admins bypass ownership restrictions
    const isOwner = job.postedBy?._id?.toString() === req.user.id || job.postedBy?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError('Access denied. You do not own this job listing.');
    }

    // Attach fetched job record to query context
    req.job = job;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJobOwnership;
