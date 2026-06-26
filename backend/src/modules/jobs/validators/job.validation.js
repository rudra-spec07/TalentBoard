import { z } from 'zod';
import { JOB_TYPE, EXPERIENCE_LEVEL, JOB_STATUS } from '../constants/job.constants.js';

// Base schema validator
const baseJobSchema = {
  title: z
    .string({ required_error: 'Job title is required' })
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  companyName: z
    .string({ required_error: 'Company name is required' })
    .min(2, 'Company name is too short')
    .max(100, 'Company name cannot exceed 100 characters')
    .trim(),
  companyLogo: z
    .string()
    .url('Invalid company logo URL format')
    .optional()
    .or(z.literal('')),
  description: z
    .string({ required_error: 'Job description is required' })
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
  responsibilities: z
    .string({ required_error: 'Responsibilities are required' })
    .min(10, 'Responsibilities text is too short')
    .max(2000, 'Responsibilities cannot exceed 2000 characters')
    .trim(),
  requirements: z
    .string({ required_error: 'Requirements are required' })
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
    .string({ required_error: 'Location is required' })
    .min(2, 'Location name is too short')
    .max(100, 'Location name cannot exceed 100 characters')
    .trim(),
  jobType: z.enum(Object.values(JOB_TYPE), {
    errorMap: () => ({ message: 'Please provide a valid job type' })
  }),
  experienceLevel: z.enum(Object.values(EXPERIENCE_LEVEL), {
    errorMap: () => ({ message: 'Please provide a valid experience level' })
  }),
  salaryMin: z
    .number()
    .min(0, 'Salary cannot be negative')
    .nullable()
    .optional(),
  salaryMax: z
    .number()
    .min(0, 'Salary cannot be negative')
    .nullable()
    .optional(),
  currency: z
    .string()
    .min(1)
    .max(10)
    .trim()
    .default('USD'),
  vacancies: z
    .number()
    .min(1, 'Must have at least 1 vacancy')
    .default(1),
  applicationDeadline: z
    .string({ required_error: 'Application deadline is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid deadline date format'
    })
    .refine((val) => new Date(val) > new Date(), {
      message: 'Application deadline must be in the future'
    }),
  status: z
    .enum([JOB_STATUS.DRAFT, JOB_STATUS.OPEN], {
      errorMap: () => ({ message: 'Status must be either draft or open' })
    })
    .optional()
};

// Validate Create Job Schema
export const createJobSchema = z
  .object(baseJobSchema)
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

// Validate Update Job Schema (Allows partial updates)
export const updateJobSchema = z
  .object({
    title: baseJobSchema.title.optional(),
    companyName: baseJobSchema.companyName.optional(),
    companyLogo: baseJobSchema.companyLogo.optional(),
    description: baseJobSchema.description.optional(),
    responsibilities: baseJobSchema.responsibilities.optional(),
    requirements: baseJobSchema.requirements.optional(),
    skillsRequired: baseJobSchema.skillsRequired.optional(),
    benefits: baseJobSchema.benefits.optional(),
    location: baseJobSchema.location.optional(),
    jobType: baseJobSchema.jobType.optional(),
    experienceLevel: baseJobSchema.experienceLevel.optional(),
    salaryMin: baseJobSchema.salaryMin.optional(),
    salaryMax: baseJobSchema.salaryMax.optional(),
    currency: baseJobSchema.currency.optional(),
    vacancies: baseJobSchema.vacancies.optional(),
    applicationDeadline: baseJobSchema.applicationDeadline.optional()
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

// Reopen schema requires a new application deadline
export const reopenJobSchema = z
  .object({
    applicationDeadline: baseJobSchema.applicationDeadline
  })
  .strict();

// Search listing validation
export const searchJobSchema = z
  .object({
    keyword: z.string().optional().default(''),
    location: z.string().optional().default(''),
    jobType: z.enum(Object.values(JOB_TYPE)).optional(),
    experienceLevel: z.enum(Object.values(EXPERIENCE_LEVEL)).optional(),
    salaryMin: z.preprocess(
      (val) => (val === undefined || val === '' ? undefined : Number(val)),
      z.number().min(0, 'Salary floor cannot be negative').optional()
    ),
    salaryMax: z.preprocess(
      (val) => (val === undefined || val === '' ? undefined : Number(val)),
      z.number().min(0, 'Salary cap cannot be negative').optional()
    ),
    skills: z.string().optional().default(''),
    page: z.preprocess(
      (val) => (val === undefined || val === '' ? 1 : Number(val)),
      z.number().int().min(1, 'Page index must be >= 1').default(1)
    ),
    limit: z.preprocess(
      (val) => (val === undefined || val === '' ? 10 : Number(val)),
      z.number().int().min(1).max(100, 'Limit cannot exceed 100').default(10)
    ),
    sortBy: z.enum(['createdAt', 'salary', 'title', 'companyName']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
  })
  .strict()
  .refine(
    (data) => {
      if (data.salaryMin !== undefined && data.salaryMax !== undefined) {
        return data.salaryMax >= data.salaryMin;
      }
      return true;
    },
    {
      message: 'salaryMax must be greater than or equal to salaryMin',
      path: ['salaryMax']
    }
  );
