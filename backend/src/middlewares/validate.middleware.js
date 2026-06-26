import { BadRequestError } from '../utils/errors.js';

const validate = (schema) => (req, res, next) => {
  try {
    if (req.method === 'GET') {
      req.query = schema.parse(req.query);
    } else {
      req.body = schema.parse(req.body);
    }
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

export default validate;
