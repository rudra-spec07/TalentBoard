import React from 'react';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import JobStatusBadge from './JobStatusBadge';
import { JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '../constants/job.constants';

export const JobHeader = ({ job }) => {
  if (!job) return null;

  const formattedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md relative overflow-hidden w-full text-left">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full"></div>
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">{job.title}</h2>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="text-sky-400 font-bold mt-1 text-sm">{job.companyName}</p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-400 mt-4 font-medium">
            <span className="flex items-center space-x-2">
              <FiMapPin className="text-slate-500" />
              <span>{job.location}</span>
            </span>
            <span className="flex items-center space-x-2">
              <FiBriefcase className="text-slate-500" />
              <span>{JOB_TYPE_LABELS[job.jobType]} • {EXPERIENCE_LEVEL_LABELS[job.experienceLevel]}</span>
            </span>
            {formattedDate && (
              <span className="flex items-center space-x-2">
                <FiCalendar className="text-slate-500" />
                <span>Posted on {formattedDate}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
