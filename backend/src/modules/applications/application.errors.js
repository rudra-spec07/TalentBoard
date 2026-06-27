import { BadRequestError, NotFoundError, ConflictError } from '../../utils/errors.js';

export class ApplicationAlreadyExistsError extends ConflictError {
  constructor(message = 'You have already applied for this job listing.') {
    super(message);
    this.name = 'ApplicationAlreadyExistsError';
  }
}

export class ResumeMissingError extends BadRequestError {
  constructor(message = 'Please upload a PDF resume before submitting applications.') {
    super(message);
    this.name = 'ResumeMissingError';
  }
}

export class JobClosedError extends BadRequestError {
  constructor(message = 'This job listing is no longer open to applications.') {
    super(message);
    this.name = 'JobClosedError';
  }
}

export class InvalidStatusTransitionError extends BadRequestError {
  constructor(message = 'The requested application status transition is invalid.') {
    super(message);
    this.name = 'InvalidStatusTransitionError';
  }
}

export class WithdrawalNotAllowedError extends BadRequestError {
  constructor(message = 'This application is under review and cannot be withdrawn.') {
    super(message);
    this.name = 'WithdrawalNotAllowedError';
  }
}

export class ApplicationNotFoundError extends NotFoundError {
  constructor(message = 'Target job application not found.') {
    super(message);
    this.name = 'ApplicationNotFoundError';
  }
}

export class UnauthorizedEmployerError extends BadRequestError {
  constructor(message = 'You are not authorized to manage candidate applications for this posting.') {
    super(message);
    this.name = 'UnauthorizedEmployerError';
  }
}
