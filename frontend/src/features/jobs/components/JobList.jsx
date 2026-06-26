import React from 'react';
import JobCard from './JobCard';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import EmptyJobs from './EmptyJobs';

export const JobList = ({
  jobs = [],
  loading = false,
  error = null,
  isEmployer = false,
  onRetry,
  onClose,
  onDelete,
  onPublish,
  onReopen,
  emptyMessage
}) => {
  if (loading) {
    return <LoadingSkeleton count={3} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!jobs || jobs.length === 0) {
    return <EmptyJobs message={emptyMessage} />;
  }

  return (
    <div className="grid gap-6 w-full">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isEmployer={isEmployer}
          onClose={onClose}
          onDelete={onDelete}
          onPublish={onPublish}
          onReopen={onReopen}
        />
      ))}
    </div>
  );
};

export default JobList;
