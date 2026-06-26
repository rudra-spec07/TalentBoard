import { useState, useEffect, useCallback } from 'react';
import { getEmployerJobs } from '../services/job.api';

export const useEmployerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEmployerJobs(params);
      if (response.data && response.data.success) {
        setJobs(response.data.data.items);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to load employer jobs dashboard listings.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Error loading dashboard jobs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    pagination,
    loading,
    error,
    refetch: fetchJobs
  };
};

export default useEmployerJobs;
