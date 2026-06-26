import { z } from 'zod';
import { JOB_TYPE, EXPERIENCE_LEVEL, JOB_STATUS } from '../constants/job.constants.js';

const baseJobFields = {
  title: z
    .string()
    .min(1, 'Job title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .min(2, 'Company name is too short')
    .max(100, 'Company name cannot exceed 100 characters')
    .trim(),
  companyLogo: z
    .string()
    .url('Invalid company logo URL format')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
  responsibilities: z
    .string()
    .min(1, 'Responsibilities are required')
    .min(10, 'Responsibilities text is too short')
    .max(2000, 'Responsibilities cannot exceed 2000 characters')
    .trim(),
  requirements: z
    .string()
    .min(1, 'Requirements are required')
    .min(10, 'Requirements text is too short')
    .max(2000, 'Requirements cannot exceed 2000 characters')
    .trim(),
  skillsRequired: z
    .array(z.string().min(1, 'Skill keyword cannot be empty').trim())
    .min(1, 'At least one skill is required')
    .max(20, 'Maximum of 20 skills allowed'),
  benefits: z
    .array(z.string().min(1, 'Benefit keyword cannot be empty').trim())
    .optional(),
  location: z
    .string()
    .min(1, 'Location is required')
    .min(2, 'Location name is too short')
    .max(100, 'Location name cannot exceed 100 characters')
    .trim(),
  jobType: z.enum(Object.values(JOB_TYPE), {
    errorMap: () => ({ message: 'Please select a valid job type' })
  }),
  experienceLevel: z.enum(Object.values(EXPERIENCE_LEVEL), {
    errorMap: () => ({ message: 'Please select a valid experience level' })
  }),
  salaryMin: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? null : Number(val)),
    z.number().min(0, 'Salary cannot be negative').nullable().optional()
  ),
  salaryMax: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? null : Number(val)),
    z.number().min(0, 'Salary cannot be negative').nullable().optional()
  ),
  currency: z
    .string()
    .min(1)
    .max(10)
    .trim()
    .default('USD'),
  vacancies: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? 1 : Number(val)),
    z.number().min(1, 'Must have at least 1 vacancy').default(1)
  ),
  applicationDeadline: z
    .string()
    .min(1, 'Application deadline is required')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid deadline date format'
    })
    .refine((val) => new Date(val) > new Date(), {
      message: 'Application deadline must be in the future'
    }),
  status: z.enum([JOB_STATUS.DRAFT, JOB_STATUS.OPEN]).default(JOB_STATUS.DRAFT)
};

// Create Job Form Schema
export const createJobSchema = z
  .object(baseJobFields)
  .strict()
  .refine(
    (data) => {
      if (data.salaryMin !== undefined && data.salaryMax !== undefined && data.salaryMin !== null && data.salaryMax !== null) {
        return data.salaryMax >= data.salaryMin;
      }
      return true;
    },
    {
      message: 'Maximum salary must be greater than or equal to minimum salary',
      path: ['salaryMax']
    }
  );

// Update Job Form Schema
export const updateJobSchema = z
  .object({
    ...baseJobFields,
    title: baseJobFields.title.optional(),
    companyName: baseJobFields.companyName.optional(),
    description: baseJobFields.description.optional(),
    responsibilities: baseJobFields.responsibilities.optional(),
    requirements: baseJobFields.requirements.optional(),
    skillsRequired: baseJobFields.skillsRequired.optional(),
    location: baseJobFields.location.optional(),
    jobType: baseJobFields.jobType.optional(),
    experienceLevel: baseJobFields.experienceLevel.optional(),
    vacancies: baseJobFields.vacancies.optional(),
    applicationDeadline: baseJobFields.applicationDeadline.optional()
  })
  .strict()
  .refine(
    (data) => {
      if (data.salaryMin !== undefined && data.salaryMax !== undefined && data.salaryMin !== null && data.salaryMax !== null) {
        return data.salaryMax >= data.salaryMin;
      }
      return true;
    },
    {
      message: 'Maximum salary must be greater than or equal to minimum salary',
      path: ['salaryMax']
    }
  );

// Reopen form validation schema
export const reopenJobSchema = z
  .object({
    applicationDeadline: baseJobFields.applicationDeadline
  })
  .strict();
