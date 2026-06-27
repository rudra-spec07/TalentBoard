import applicationService from './application.service.js';

class ApplicationController {
  /**
   * Post new application.
   */
  async applyJob(req, res, next) {
    try {
      const result = await applicationService.applyJob(req.user.id, req.body);
      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get detail of a specific application.
   */
  async getApplication(req, res, next) {
    try {
      const result = await applicationService.getApplication(
        req.params.id, 
        req.user.id, 
        req.user.role
      );
      res.status(200).json({
        success: true,
        message: 'Application details retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get applications submitted by seeker caller.
   */
  async getMyApplications(req, res, next) {
    try {
      const result = await applicationService.getMyApplications(req.user.id, req.query);
      res.status(200).json({
        success: true,
        message: 'My applications retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get list of applicants applying to a job.
   */
  async getApplicantsForJob(req, res, next) {
    try {
      const result = await applicationService.getApplicantsForJob(
        req.params.jobId, 
        req.user.id, 
        req.user.role, 
        req.query
      );
      res.status(200).json({
        success: true,
        message: 'Applicants list retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update status of applicant.
   */
  async updateStatus(req, res, next) {
    try {
      const { status, notes } = req.body;
      const result = await applicationService.updateStatus(
        req.params.id, 
        req.user.id, 
        req.user.role, 
        status, 
        notes
      );
      res.status(200).json({
        success: true,
        message: 'Application status updated successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Seeker withdraws application.
   */
  async withdrawApplication(req, res, next) {
    try {
      await applicationService.withdrawApplication(req.params.id, req.user.id);
      res.status(200).json({
        success: true,
        message: 'Application withdrawn successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ApplicationController();
