import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMapPin, 
  FiCalendar, 
  FiDollarSign, 
  FiEye, 
  FiFileText, 
  FiEdit, 
  FiXCircle, 
  FiTrash2, 
  FiCheckCircle, 
  FiRefreshCw 
} from 'react-icons/fi';
import JobStatusBadge from './JobStatusBadge';
import { JOB_STATUS, JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '../constants/job.constants';

export const JobCard = ({ 
  job, 
  isEmployer = false, 
  onClose, 
  onDelete, 
  onPublish, 
  onReopen 
}) => {
  if (!job) return null;

  const formattedDeadline = job.applicationDeadline 
    ? new Date(job.applicationDeadline).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'No deadline';

  const formattedSalary = () => {
    if (job.salaryMin !== null && job.salaryMax !== null) {
      return `${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMin !== null) {
      return `>= ${job.salaryMin.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMax !== null) {
      return `<= ${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    return 'Competitive';
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md hover:border-sky-500/25 transition-all duration-300 relative group w-full text-left">
      {/* Decorative hover gradient border */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-sky-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none transition-opacity duration-300"></div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-4">
          {/* Logo container */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-lg shrink-0">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={job.companyName} 
                className="w-full h-full object-cover rounded-2xl bg-slate-950"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center font-black text-xl text-sky-400">
                {job.companyName?.substring(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
              {job.title}
            </h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">{job.companyName}</p>
            
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-2 font-medium">
              <span className="flex items-center space-x-1">
                <FiMapPin className="text-slate-650" />
                <span>{job.location}</span>
              </span>
              <span>•</span>
              <span>{JOB_TYPE_LABELS[job.jobType] || job.jobType}</span>
              <span>•</span>
              <span>{EXPERIENCE_LEVEL_LABELS[job.experienceLevel] || job.experienceLevel}</span>
            </div>
          </div>
        </div>

        {/* Status / Quick details */}
        <div className="self-start sm:self-auto flex sm:flex-col items-end gap-2 shrink-0">
          <JobStatusBadge status={job.status} />
          <span className="text-xs font-extrabold text-sky-400 flex items-center space-x-1">
            <FiDollarSign />
            <span>{formattedSalary()}</span>
          </span>
        </div>
      </div>

      {/* Skills Required Row */}
      {job.skillsRequired && job.skillsRequired.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/50 relative z-10">
          {job.skillsRequired.slice(0, 4).map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 text-[10px] font-bold bg-slate-950 text-sky-450 border border-slate-850 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > 4 && (
            <span className="text-[10px] text-slate-550 pl-1 font-semibold flex items-center">
              +{job.skillsRequired.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Employer dashboard metrics & actions or seeker buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800/80 relative z-10">
        {isEmployer ? (
          <>
            {/* Stats */}
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 self-start sm:self-auto">
              <span className="flex items-center space-x-1.5">
                <FiEye className="text-sky-400" />
                <span>{job.viewsCount || 0} Views</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <FiFileText className="text-indigo-400" />
                <span>{job.totalApplications || 0} Applications</span>
              </span>
            </div>

            {/* Admin/Employer quick actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {job.status === JOB_STATUS.DRAFT && onPublish && (
                <button
                  onClick={() => onPublish(job.id)}
                  className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <FiCheckCircle />
                  <span>Publish</span>
                </button>
              )}
              {job.status === JOB_STATUS.OPEN && onClose && (
                <button
                  onClick={() => onClose(job.id)}
                  className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-455 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <FiXCircle />
                  <span>Close</span>
                </button>
              )}
              {(job.status === JOB_STATUS.CLOSED || job.status === JOB_STATUS.EXPIRED) && onReopen && (
                <button
                  onClick={() => onReopen(job.id)}
                  className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-455 rounded-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <FiRefreshCw />
                  <span>Reopen</span>
                </button>
              )}
              <Link
                to={`/employer/jobs/${job.id}/edit`}
                className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-350 rounded-lg flex items-center justify-center space-x-1.5 transition-all"
              >
                <FiEdit />
                <span>Edit</span>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(job.id)}
                  className="px-2.5 py-1.5 text-xs font-bold bg-rose-500/5 hover:bg-rose-550/20 text-rose-455 rounded-lg transition-colors border border-rose-500/10"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Seeker / public details footer */}
            <span className="flex items-center space-x-1 text-xs text-slate-550 font-medium self-start sm:self-auto">
              <FiCalendar />
              <span>Deadline: {formattedDeadline}</span>
            </span>

            <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
              <Link
                to={`/jobs/${job.id}`}
                className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-450 text-slate-950 rounded-xl transition-all shadow-md shadow-sky-500/5 hover:shadow-sky-500/15"
              >
                View Details
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
