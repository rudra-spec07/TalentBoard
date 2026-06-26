import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '../services/job.api';

export const useJobs = (initialFilters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    salaryMin: '',
    skills: '',
    page: 1,
    limit: 10,
    ...initialFilters
  });

  const fetchJobsList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Filter out empty params
      const cleanParams = Object.keys(filters).reduce((acc, key) => {
        const val = filters[key];
        if (val !== '' && val !== null && val !== undefined) {
          acc[key] = val;
        }
        return acc;
      }, {});

      const response = await getJobs(cleanParams);
      if (response.data && response.data.success) {
        setJobs(response.data.data.items);
        setPagination(response.data.data.pagination);
      } else {
        setError('Failed to retrieve jobs list.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Error loading jobs feed.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobsList();
  }, [fetchJobsList]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return {
    jobs,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
    refetch: fetchJobsList
  };
};

export default useJobs;
