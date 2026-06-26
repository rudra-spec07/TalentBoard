import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required'
  }).min(2, 'First name must be at least 2 characters').max(50, 'First name cannot exceed 50 characters').trim(),
  
  lastName: z.string({
    required_error: 'Last name is required'
  }).min(2, 'Last name must be at least 2 characters').max(50, 'Last name cannot exceed 50 characters').trim(),
  
  email: z.string({
    required_error: 'Email is required'
  }).email('Please enter a valid email address').trim().toLowerCase(),
  
  password: z.string({
    required_error: 'Password is required'
  }).min(6, 'Password must be at least 6 characters').max(100, 'Password cannot exceed 100 characters'),
  
  role: z.enum(['job_seeker', 'employer', 'admin'], {
    invalid_type_error: 'Role must be one of: job_seeker, employer, admin'
  }).optional()
});

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required'
  }).email('Please enter a valid email address').trim().toLowerCase(),
  
  password: z.string({
    required_error: 'Password is required'
  })
});
