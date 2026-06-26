import api from '../../../api/axios';

/**
 * Sends a registration request to the backend
 */
export const registerRequest = async (userData) => {
  return await api.post('/auth/register', userData);
};

/**
 * Sends a login request to the backend
 */
export const loginRequest = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

/**
 * Fetches the currently logged-in user profile details
 */
export const getMeRequest = async () => {
  return await api.get('/auth/me');
};
