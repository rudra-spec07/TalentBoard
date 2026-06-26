import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
  role: z
    .enum(['job_seeker', 'employer', 'admin'], {
      errorMap: () => ({ message: 'Please select a valid role type' })
    })
    .default('job_seeker')
});
