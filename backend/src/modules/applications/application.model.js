import mongoose from 'mongoose';
import { APPLICATION_STATUS } from './application.constants.js';

const applicationSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant ID is required']
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required']
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Employer ID is required']
    },
    resumeUrl: {
      type: String,
      required: [true, 'A resume PDF URL is required to apply']
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, 'Cover letter cannot exceed 5000 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.APPLIED,
      required: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Employer review notes cannot exceed 2000 characters'],
      default: ''
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    appliedAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    withdrawn: {
      type: Boolean,
      default: false,
      required: true
    },
    withdrawnAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    versionKey: '__v'
  }
);

// Compound indexes and text index
applicationSchema.index({ applicantId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ employerId: 1, status: 1, appliedAt: -1 });
applicationSchema.index({ applicantId: 1, withdrawn: 1, appliedAt: -1 });
applicationSchema.index({ jobId: 1, status: 1, appliedAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
