import { ForbiddenError } from '../utils/errors.js';

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new ForbiddenError('Access Denied. User authentication required.');
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError('Access Denied. Insufficient permissions.');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
