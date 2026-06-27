/**
 * Sanitized Seeker basic overview payload structure.
 */
export const toApplicationDTO = (doc) => {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    jobId: doc.jobId?._id?.toString() || doc.jobId?.toString() || null,
    jobTitle: doc.jobId?.title || null,
    companyName: doc.jobId?.companyName || null,
    status: doc.status,
    appliedAt: doc.appliedAt,
    withdrawn: doc.withdrawn
  };
};

/**
 * Seeker deep detailed response structure.
 */
export const toApplicationDetailDTO = (doc) => {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    jobId: doc.jobId?._id?.toString() || doc.jobId?.toString() || null,
    jobTitle: doc.jobId?.title || null,
    companyName: doc.jobId?.companyName || null,
    employerId: doc.employerId?.toString() || null,
    resumeUrl: doc.resumeUrl,
    coverLetter: doc.coverLetter,
    status: doc.status,
    appliedAt: doc.appliedAt,
    withdrawn: doc.withdrawn,
    withdrawnAt: doc.withdrawnAt
  };
};

/**
 * Employer detailed candidate inspection response structure.
 */
export const toEmployerApplicationDTO = (doc) => {
  if (!doc) return null;
  
  // Format applicant detail sub-object
  let applicant = null;
  if (doc.applicantId) {
    if (doc.applicantId._id) {
      applicant = {
        id: doc.applicantId._id.toString(),
        firstName: doc.applicantId.firstName || '',
        lastName: doc.applicantId.lastName || '',
        email: doc.applicantId.email || ''
      };
    } else {
      applicant = doc.applicantId.toString();
    }
  }

  return {
    id: doc._id.toString(),
    jobId: doc.jobId?._id?.toString() || doc.jobId?.toString() || null,
    jobTitle: doc.jobId?.title || null,
    applicant,
    resumeUrl: doc.resumeUrl,
    coverLetter: doc.coverLetter,
    status: doc.status,
    notes: doc.notes,
    appliedAt: doc.appliedAt,
    reviewedAt: doc.reviewedAt,
    withdrawn: doc.withdrawn
  };
};
