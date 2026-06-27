import { useState, useEffect, useCallback } from 'react';
import { getApplicants } from '../services/application.api';

export const useApplicants = (jobId, filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { page, limit, status } = filters;

  const fetchApplicants = useCallback(async () => {
    if (!jobId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getApplicants(jobId, { page, limit, status });
      setData(response);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error loading applicants.');
    } finally {
      setLoading(false);
    }
  }, [jobId, page, limit, status]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return {
    data,
    isLoading: loading,
    isError: !!error,
    error,
    refetch: fetchApplicants
  };
};

export default useApplicants;
