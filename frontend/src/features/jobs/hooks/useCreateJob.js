import { useState } from 'react';
import { createJob } from '../services/job.api';

export const useCreateJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const create = async (jobData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await createJob(jobData);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to create job posting.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    create,
    isSubmitting,
    error
  };
};

export default useCreateJob;
