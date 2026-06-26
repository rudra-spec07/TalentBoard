import { useState, useEffect, useCallback } from 'react';
import { getJob } from '../services/job.api';

export const useJob = (id) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getJob(id);
      if (response.data && response.data.success) {
        setJob(response.data.data.job);
      } else {
        setError('Failed to retrieve job details.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Error loading job details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJobDetail();
  }, [fetchJobDetail]);

  return {
    job,
    loading,
    error,
    refetch: fetchJobDetail
  };
};

export default useJob;
