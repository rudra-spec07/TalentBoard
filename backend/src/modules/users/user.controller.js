import userService from './user.service.js';

class UserController {
  /**
   * Get the current user profile
   */
  async getProfile(req, res, next) {
    try {
      const profile = await userService.getProfile(req.user.id);
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: { profile }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update the current user profile
   */
  async updateProfile(req, res, next) {
    try {
      const profile = await userService.updateProfile(req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: { profile }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload resume and save URL
   */
  async uploadResume(req, res, next) {
    try {
      const profile = await userService.uploadResume(req.user.id, req.file.buffer);
      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: { profile }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Soft-delete user account
   */
  async deleteAccount(req, res, next) {
    try {
      const profile = await userService.deleteAccount(req.user.id);
      res.status(200).json({
        success: true,
        message: 'Account deactivated successfully',
        data: { profile }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
