import { useState, useEffect, useCallback } from 'react';
import { getProfile, updateProfile, uploadResume, deleteAccount } from '../services/profile.api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch profile details
  const refreshProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      if (response.data && response.data.success) {
        setProfile(response.data.data.profile);
      } else {
        setError('Failed to retrieve profile data.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error?.message || 'Error loading profile.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  // Update profile details
  const updateProfileDetails = async (updateData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await updateProfile(updateData);
      if (response.data && response.data.success) {
        setProfile(response.data.data.profile);
        setSuccess(true);
        return response.data.data.profile;
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.error?.message || 'Failed to update profile.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Upload resume file
  const uploadResumeFile = async (file, onProgress) => {
    setError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await uploadResume(formData, (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      });

      if (response.data && response.data.success) {
        setProfile(response.data.data.profile);
        setSuccess(true);
        return response.data.data.profile;
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.error?.message || 'Resume upload failed.';
      setError(errMsg);
      throw new Error(errMsg);
    }
  };

  // Soft deactivate account
  const deactivateAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteAccount();
      return response.data;
    } catch (err) {
      const errMsg = err.response?.data?.message || err.response?.data?.error?.message || 'Failed to deactivate account.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    success,
    updateProfile: updateProfileDetails,
    uploadResume: uploadResumeFile,
    deactivateAccount,
    refreshProfile
  };
};

export default useProfile;
