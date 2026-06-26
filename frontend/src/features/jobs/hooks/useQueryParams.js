import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

/**
 * Hook to parse and modify React Router URLSearchParams.
 * Automatically clears empty values to keep clean browser URL strings.
 */
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  const setQueryParams = useCallback((newParams) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      });
      // Reset page to 1 if other filters are changed unless page is explicitly provided
      if (Object.keys(newParams).some(k => k !== 'page')) {
        if (!newParams.hasOwnProperty('page')) {
          nextParams.delete('page');
        }
      }
      return nextParams;
    });
  }, [setSearchParams]);

  return [queryParams, setQueryParams];
};

export default useQueryParams;
