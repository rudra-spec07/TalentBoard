/**
 * Shapes job document into a brief public summary.
 * Used for general search result listings.
 */
export const toJobSummaryDTO = (job) => {
  if (!job) return null;
  return {
    id: job._id.toString(),
    title: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo || '',
    location: job.location,
    jobType: job.jobType,
    experienceLevel: job.experienceLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    currency: job.currency,
    skillsRequired: job.skillsRequired,
    vacancies: job.vacancies,
    applicationDeadline: job.applicationDeadline,
    status: job.status,
    createdAt: job.createdAt
  };
};

/**
 * Shapes job document into a detailed seeker view.
 * Removes sensitive audit logs but keeps descriptions and parameters.
 */
export const toJobDetailDTO = (job) => {
  if (!job) return null;
  return {
    id: job._id.toString(),
    title: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo || '',
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    skillsRequired: job.skillsRequired,
    benefits: job.benefits || [],
    location: job.location,
    jobType: job.jobType,
    experienceLevel: job.experienceLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    currency: job.currency,
    vacancies: job.vacancies,
    applicationDeadline: job.applicationDeadline,
    status: job.status,
    postedBy: job.postedBy?._id ? {
      id: job.postedBy._id.toString(),
      firstName: job.postedBy.firstName || '',
      lastName: job.postedBy.lastName || '',
      email: job.postedBy.email || ''
    } : job.postedBy?.toString() || '',
    viewsCount: job.viewsCount,
    totalApplications: job.totalApplications,
    createdAt: job.createdAt
  };
};

/**
 * Shapes job document for the posting Employer's workspace view.
 * Includes drafts, metrics, and application counters.
 */
export const toEmployerJobDTO = (job) => {
  if (!job) return null;
  return {
    id: job._id.toString(),
    title: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo || '',
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    skillsRequired: job.skillsRequired,
    benefits: job.benefits || [],
    location: job.location,
    jobType: job.jobType,
    experienceLevel: job.experienceLevel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    currency: job.currency,
    vacancies: job.vacancies,
    applicationDeadline: job.applicationDeadline,
    status: job.status,
    viewsCount: job.viewsCount,
    totalApplications: job.totalApplications,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt
  };
};

/**
 * Shapes job document for Admin moderate views.
 * Exposes soft-deleted details and auditor keys.
 */
export const toAdminJobDTO = (job) => {
  if (!job) return null;
  return {
    id: job._id.toString(),
    title: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo || '',
    location: job.location,
    status: job.status,
    postedBy: job.postedBy?._id ? {
      id: job.postedBy._id.toString(),
      firstName: job.postedBy.firstName || '',
      lastName: job.postedBy.lastName || '',
      email: job.postedBy.email || ''
    } : job.postedBy?.toString() || '',
    viewsCount: job.viewsCount,
    totalApplications: job.totalApplications,
    isDeleted: job.isDeleted,
    deletedAt: job.deletedAt,
    deletedBy: job.deletedBy,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt
  };
};

/**
 * Shapes job document for optimized public search feeds.
 */
export const toSearchJobSummaryDTO = (job) => {
  if (!job) return null;
  return {
    id: (job._id || job.id).toString(),
    title: job.title,
    companyName: job.companyName,
    companyLogo: job.companyLogo || null,
    location: job.location,
    salaryMin: job.salaryMin ?? null,
    salaryMax: job.salaryMax ?? null,
    currency: job.currency || 'USD',
    experienceLevel: job.experienceLevel,
    jobType: job.jobType,
    createdAt: job.createdAt
  };
};

/**
 * Wraps list DTO items with pagination attributes.
 */
export const toPaginatedJobListDTO = (items, totalCount, page, limit, mapper = toJobSummaryDTO) => {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    items: items.map(item => mapper(item)),
    pagination: {
      totalItems: totalCount,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};
