import api from '../../../api/axios';

/**
 * Search and filter public open job postings
 */
export const getJobs = async (params = {}) => {
  return await api.get('/v1/jobs', { params });
};

/**
 * Fetch details of a specific job by ID
 */
export const getJob = async (id) => {
  return await api.get(`/v1/jobs/${id}`);
};

/**
 * Create a new job posting (Draft or Open)
 */
export const createJob = async (jobData) => {
  return await api.post('/v1/jobs', jobData);
};

/**
 * Update parameters of a job posting
 */
export const updateJob = async (id, updateData) => {
  return await api.put(`/v1/jobs/${id}`, updateData);
};

/**
 * Publish a draft job listing
 */
export const publishJob = async (id) => {
  return await api.put(`/v1/jobs/${id}/publish`);
};

/**
 * Close an active job listing
 */
export const closeJob = async (id) => {
  return await api.put(`/v1/jobs/${id}/close`);
};

/**
 * Reopen a closed or expired job with a fresh deadline
 */
export const reopenJob = async (id, applicationDeadline) => {
  return await api.put(`/v1/jobs/${id}/reopen`, { applicationDeadline });
};

/**
 * Soft-delete a job listing
 */
export const deleteJob = async (id) => {
  return await api.delete(`/v1/jobs/${id}`);
};

/**
 * Retrieve list of jobs posted by the employer caller
 */
export const getEmployerJobs = async (params = {}) => {
  return await api.get('/v1/jobs/my', { params });
};
