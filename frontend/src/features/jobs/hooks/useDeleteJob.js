import { useState } from 'react';
import { deleteJob } from '../services/job.api';

export const useDeleteJob = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setIsDeleting(true);
    setError(null);
    try {
      const response = await deleteJob(id);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to delete job posting.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteJob: remove,
    isDeleting,
    error
  };
};

export default useDeleteJob;
