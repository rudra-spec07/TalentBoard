import api from '../../../api/axios';

/**
 * Submit job application
 */
export const applyJob = async ({ jobId, coverLetter }) => {
  const response = await api.post('/v1/applications', { jobId, coverLetter });
  return response.data;
};

/**
 * Get seeker's submitted applications
 */
export const getMyApplications = async (params = {}) => {
  const response = await api.get('/v1/applications/me', { params });
  return response.data;
};

/**
 * Get specific application details
 */
export const getApplication = async (id) => {
  const response = await api.get(`/v1/applications/${id}`);
  return response.data;
};

/**
 * Get applicants for a job (Employer dashboard view)
 */
export const getApplicants = async (jobId, params = {}) => {
  const response = await api.get(`/v1/applications/job/${jobId}`, { params });
  return response.data;
};

/**
 * Update candidate status
 */
export const updateStatus = async (id, { status, notes }) => {
  const response = await api.patch(`/v1/applications/${id}/status`, { status, notes });
  return response.data;
};

/**
 * Seeker withdraws application
 */
export const withdrawApplication = async (id) => {
  const response = await api.delete(`/v1/applications/${id}`);
  return response.data;
};
