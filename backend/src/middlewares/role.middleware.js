const { ForbiddenError } = require('../utils/errors');

/**
 * Restricts access to user roles.
 * @param {...string} allowedRoles Roles that are permitted to access the resource
 */
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

module.exports = authorize;
