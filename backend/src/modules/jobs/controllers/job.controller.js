import jobService from '../services/job.service.js';

class JobController {
  /**
   * Post a new Job Listing (defaults to Draft)
   */
  async createJob(req, res, next) {
    try {
      const job = await jobService.createJob(req.body, req.user.id);
      res.status(201).json({
        success: true,
        message: 'Job posting created successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update details of a Job listing
   */
  async updateJob(req, res, next) {
    try {
      const job = await jobService.updateJob(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Job posting updated successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Publish a Draft job
   */
  async publishJob(req, res, next) {
    try {
      const job = await jobService.publishJob(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Job posting published successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Close an active job
   */
  async closeJob(req, res, next) {
    try {
      const job = await jobService.closeJob(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Job posting closed successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reopen a closed or expired listing
   */
  async reopenJob(req, res, next) {
    try {
      const { applicationDeadline } = req.body;
      const job = await jobService.reopenJob(req.params.id, applicationDeadline);
      res.status(200).json({
        success: true,
        message: 'Job posting reopened successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Soft-delete a job listing
   */
  async deleteJob(req, res, next) {
    try {
      await jobService.deleteJob(req.params.id, req.user.id);
      res.status(200).json({
        success: true,
        message: 'Job posting deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * View details of a specific job
   */
  async getJob(req, res, next) {
    try {
      const userId = req.user?.id || null;
      const job = await jobService.getJob(req.params.id, userId);
      res.status(200).json({
        success: true,
        message: 'Job details retrieved successfully',
        data: { job }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * General public search listings
   */
  async getJobs(req, res, next) {
    try {
      const filters = {
        keyword: req.query.keyword,
        location: req.query.location,
        jobType: req.query.jobType,
        experienceLevel: req.query.experienceLevel,
        salaryMin: req.query.salaryMin ? Number(req.query.salaryMin) : undefined,
        skills: req.query.skills
      };

      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10
      };

      const result = await jobService.getPublicJobs(filters, options);
      res.status(200).json({
        success: true,
        message: 'Jobs retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve list of jobs posted by the logged-in Employer
   */
  async getEmployerJobs(req, res, next) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10
      };

      const result = await jobService.getEmployerJobs(req.user.id, options);
      res.status(200).json({
        success: true,
        message: 'Employer jobs retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin dashboard view of all listings (including deleted)
   */
  async adminGetJobs(req, res, next) {
    try {
      const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10
      };

      const result = await jobService.adminGetJobs(options);
      res.status(200).json({
        success: true,
        message: 'Admin audit list retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Force delete job list via administrator privilege
   */
  async adminDeleteJob(req, res, next) {
    try {
      await jobService.deleteJob(req.params.id, req.user.id);
      res.status(200).json({
        success: true,
        message: 'Job posting force-deleted successfully by Administrator'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new JobController();
