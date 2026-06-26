import { useState } from 'react';
import { updateJob, publishJob, closeJob, reopenJob } from '../services/job.api';

export const useUpdateJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updateData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await updateJob(id, updateData);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to update job details.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const publish = async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await publishJob(id);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to publish job.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await closeJob(id);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to close job listing.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reopen = async (id, applicationDeadline) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await reopenJob(id, applicationDeadline);
      return response.data;
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || 'Failed to reopen job listing.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    update,
    publish,
    close,
    reopen,
    isSubmitting,
    error
  };
};

export default useUpdateJob;
