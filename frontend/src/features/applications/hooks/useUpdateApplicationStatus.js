import { useState } from 'react';
import { updateStatus } from '../services/application.api';

export const useUpdateApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async ({ id, status, notes }, { onSuccess, onError } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateStatus(id, { status, notes });
      if (onSuccess) onSuccess(response);
      return response;
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update status.';
      setError(msg);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isPending: loading, error };
};

export default useUpdateApplicationStatus;
