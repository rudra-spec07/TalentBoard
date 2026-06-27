import { useState, useEffect, useCallback } from 'react';
import { getMyApplications } from '../services/application.api';

export const useApplications = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { page, limit, status } = filters || {};
  const isDisabled = filters === null;

  const fetchApplications = useCallback(async () => {
    if (isDisabled) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getMyApplications({ page, limit, status });
      setData(response);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error loading applications.');
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, isDisabled]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    data,
    isLoading: loading,
    isError: !!error,
    error,
    refetch: fetchApplications
  };
};

export default useApplications;
