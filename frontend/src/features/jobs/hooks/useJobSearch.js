import { useState, useEffect, useCallback } from 'react';
import { searchListings } from '../services/jobSearch.api';
import useQueryParams from './useQueryParams';
import { SEARCH_DEFAULTS } from '../constants/search.constants';

/**
 * Custom state hook driving the Job Search & Discovery UI pipeline.
 * Synchronizes search parameters with URL search params.
 */
export const useJobSearch = () => {
  const [queryParams, setQueryParams] = useQueryParams();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse filters from URL search params, fallback to defaults
  const filters = {
    keyword: queryParams.keyword || '',
    location: queryParams.location || '',
    jobType: queryParams.jobType || '',
    experienceLevel: queryParams.experienceLevel || '',
    salaryMin: queryParams.salaryMin || '',
    salaryMax: queryParams.salaryMax || '',
    skills: queryParams.skills || '',
    sortBy: queryParams.sortBy || SEARCH_DEFAULTS.SORT_BY,
    sortOrder: queryParams.sortOrder || SEARCH_DEFAULTS.SORT_ORDER,
    page: Number(queryParams.page) || SEARCH_DEFAULTS.PAGE,
    limit: Number(queryParams.limit) || SEARCH_DEFAULTS.LIMIT
  };

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentFilters = {
        keyword: queryParams.keyword || '',
        location: queryParams.location || '',
        jobType: queryParams.jobType || '',
        experienceLevel: queryParams.experienceLevel || '',
        salaryMin: queryParams.salaryMin || '',
        salaryMax: queryParams.salaryMax || '',
        skills: queryParams.skills || '',
        sortBy: queryParams.sortBy || SEARCH_DEFAULTS.SORT_BY,
        sortOrder: queryParams.sortOrder || SEARCH_DEFAULTS.SORT_ORDER,
        page: Number(queryParams.page) || SEARCH_DEFAULTS.PAGE,
        limit: Number(queryParams.limit) || SEARCH_DEFAULTS.LIMIT
      };

      // Build query object matching Zod schema constraints
      const cleanParams = {};
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          cleanParams[key] = value;
        }
      });

      const response = await searchListings(cleanParams);
      if (response && response.success) {
        setJobs(response.data.items);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to retrieve search listings.');
      }
    } catch (err) {
      // Bypass state updates if request was aborted
      if (err.name !== 'CanceledError' && err.message !== 'canceled') {
        console.error(err);
        setError(
          err.response?.data?.message || 
          err.response?.data?.errors?.[0]?.message || 
          err.response?.data?.errors?.[0] || 
          'Error loading job listings.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [queryParams]); // Re-run when URL queries change

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const updateFilters = useCallback((newFilters) => {
    setQueryParams(newFilters);
  }, [setQueryParams]);

  const changePage = useCallback((newPage) => {
    setQueryParams({ page: newPage });
  }, [setQueryParams]);

  return {
    jobs,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
    refetch: fetchResults
  };
};

export default useJobSearch;
