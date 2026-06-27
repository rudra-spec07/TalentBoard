import { z } from 'zod';
import { APPLICATION_STATUS } from './application.constants.js';

// Regular expression to validate MongoDB hex ObjectIDs
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const validateObjectId = z.string().regex(objectIdRegex, 'Invalid unique identifier format');

export const applyJobSchema = z.object({
  jobId: validateObjectId,
  coverLetter: z
    .string()
    .max(5000, 'Cover letter cannot exceed 5000 characters')
    .optional()
    .default('')
}).strict();

export const updateStatusSchema = z.object({
  status: z.enum(Object.values(APPLICATION_STATUS), {
    errorMap: () => ({ message: 'Invalid target status code' })
  }),
  notes: z
    .string()
    .max(2000, 'Review notes cannot exceed 2000 characters')
    .optional()
}).strict();

export const queryApplicationsSchema = z.object({
  page: z.preprocess((val) => Number(val) || 1, z.number().int().min(1).default(1)),
  limit: z.preprocess((val) => Number(val) || 10, z.number().int().min(1).max(50).default(10)),
  status: z.enum(Object.values(APPLICATION_STATUS)).optional(),
  sortBy: z.enum(['appliedAt', 'status']).optional().default('appliedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  // Add jobId validation if filtering applications by job
  jobId: validateObjectId.optional()
}).strict();
