import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE, EXPERIENCE_LEVEL } from '../constants/job.constants.js';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    companyLogo: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
      maxlength: [2000, 'Job description cannot exceed 2000 characters']
    },
    responsibilities: {
      type: String,
      required: [true, 'Key responsibilities are required'],
      trim: true,
      maxlength: [2000, 'Responsibilities cannot exceed 2000 characters']
    },
    requirements: {
      type: String,
      required: [true, 'Job requirements are required'],
      trim: true,
      maxlength: [2000, 'Requirements cannot exceed 2000 characters']
    },
    skillsRequired: {
      type: [String],
      required: [true, 'At least one required skill must be specified'],
      default: []
    },
    benefits: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location name is too long']
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
      enum: Object.values(JOB_TYPE)
    },
    experienceLevel: {
      type: String,
      required: [true, 'Experience level is required'],
      enum: Object.values(EXPERIENCE_LEVEL)
    },
    salaryMin: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
      default: null
    },
    salaryMax: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
      default: null
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      default: 'USD',
      trim: true
    },
    vacancies: {
      type: Number,
      required: [true, 'Number of vacancies is required'],
      min: [1, 'Must have at least 1 vacancy'],
      default: 1
    },
    applicationDeadline: {
      type: Date,
      required: [true, 'Application deadline is required']
    },
    status: {
      type: String,
      required: [true, 'Job status is required'],
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.DRAFT
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job poster user reference is required']
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    totalApplications: {
      type: Number,
      default: 0,
      min: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    versionKey: '__v',
    strict: true
  }
);

// Compound indexes and Text indexes for performance optimization
jobSchema.index({ status: 1, isDeleted: 1, applicationDeadline: 1 });
jobSchema.index({ postedBy: 1, isDeleted: 1 });
jobSchema.index({ title: 'text', companyName: 'text', description: 'text' });
jobSchema.index({ skillsRequired: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ salaryMin: 1, salaryMax: 1 });

const Job = mongoose.model('Job', jobSchema);

export default Job;
