const { BadRequestError } = require('../utils/errors');

/**
 * Express middleware to validate request body using a Zod schema.
 * @param {import('zod').ZodSchema} schema 
 */
const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return next(new BadRequestError('Validation failed', formattedErrors));
    }
    next(error);
  }
};

module.exports = validate;
