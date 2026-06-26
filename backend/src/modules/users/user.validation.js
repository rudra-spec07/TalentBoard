import { z } from 'zod';

// Regex for validating international phone format (e.g. +1234567890)
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const updateProfileSchema = z.object({
  headline: z
    .string()
    .max(100, 'Headline cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  
  bio: z
    .string()
    .max(1000, 'Bio cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
  
  city: z
    .string()
    .max(100, 'City name is too long')
    .optional()
    .or(z.literal('')),
  
  country: z
    .string()
    .max(100, 'Country name is too long')
    .optional()
    .or(z.literal('')),
  
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Please provide a valid international phone format (e.g. +1234567890)')
    .optional()
    .or(z.literal('')),
  
  skills: z
    .array(z.string().trim())
    .max(20, 'Skills cannot exceed 20 items')
    .optional(),
  
  githubUrl: z
    .string()
    .url('Please enter a valid GitHub URL')
    .optional()
    .or(z.literal('')),
  
  linkedinUrl: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  
  portfolioUrl: z
    .string()
    .url('Please enter a valid Portfolio URL')
    .optional()
    .or(z.literal('')),
  
  avatar: z
    .string()
    .optional()
    .or(z.literal(''))
}).strict(); // Rejects unknown fields
