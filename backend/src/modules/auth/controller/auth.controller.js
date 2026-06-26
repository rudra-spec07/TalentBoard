const authService = require('../service/auth.service');

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Log in an existing user
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve currently authenticated user profile
   */
  async getCurrentUser(req, res, next) {
    try {
      // req.user is populated by authMiddleware
      res.status(200).json({
        success: true,
        data: {
          user: req.user
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
