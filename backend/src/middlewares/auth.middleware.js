const jwt = require('jsonwebtoken');
const userRepository = require('../modules/auth/repository/user.repository');
const { UnauthorizedError } = require('../utils/errors');

/**
 * Authenticates user requests by validating JWT tokens.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'talentboardx_super_secret_jwt_key_2026';

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired authentication token.');
    }

    // Retrieve user and check status
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User associated with this token no longer exists.');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Your account is currently suspended.');
    }

    // Attach user information to request
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
