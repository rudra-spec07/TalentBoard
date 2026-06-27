import { useState } from 'react';
import { applyJob } from '../services/application.api';

export const useApplyJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (payload, { onSuccess, onError } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await applyJob(payload);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit application.';
      setError(msg);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isPending: loading, error };
};

export default useApplyJob;
