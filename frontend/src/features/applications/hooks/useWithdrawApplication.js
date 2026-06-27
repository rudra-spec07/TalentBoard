import { useState } from 'react';
import { withdrawApplication } from '../services/application.api';

export const useWithdrawApplication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (id, { onSuccess, onError } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await withdrawApplication(id);
      if (onSuccess) onSuccess(response);
      return response;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to withdraw application.';
      setError(msg);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isPending: loading, error };
};

export default useWithdrawApplication;
