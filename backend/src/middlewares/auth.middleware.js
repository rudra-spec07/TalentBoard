import jwt from 'jsonwebtoken';
import userRepository from '../modules/auth/repository/user.repository.js';
import { UnauthorizedError } from '../utils/errors.js';

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

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedError('User associated with this token no longer exists.');
    }

    // Verify account active status
    if (user.isActive === false) {
      throw new UnauthorizedError('Your account has been deactivated.');
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
