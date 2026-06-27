import { z } from 'zod';

export const applyJobSchema = z.object({
  coverLetter: z
    .string()
    .max(5000, 'Cover letter cannot exceed 5000 characters')
    .optional()
    .default('')
});

export const updateStatusSchema = z.object({
  status: z.string().min(1, 'Target status is required'),
  notes: z
    .string()
    .max(2000, 'Review notes cannot exceed 2000 characters')
    .optional()
    .default('')
});
