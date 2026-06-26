import api from '../../../api/axios';

/**
 * Fetch the authenticated user's profile details
 */
export const getProfile = async () => {
  return await api.get('/v1/users/me');
};

/**
 * Update the authenticated user's profile details
 */
export const updateProfile = async (profileData) => {
  return await api.put('/v1/users/me', profileData);
};

/**
 * Upload resume PDF document
 * @param {FormData} formData Multi-part form data holding resume file
 */
export const uploadResume = async (formData, onUploadProgress) => {
  return await api.post('/v1/users/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });
};

/**
 * Soft-delete user profile
 */
export const deleteAccount = async () => {
  return await api.delete('/v1/users/me');
};
