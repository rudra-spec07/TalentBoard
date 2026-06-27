import React from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiClock, FiUsers, FiMail, FiLayers } from 'react-icons/fi';

export const JobSidebar = ({ job, user, hasApplied, onApply }) => {
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
      return `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMin !== null) {
      return `>= ${job.salaryMin.toLocaleString()} ${job.currency}`;
    }
    if (job.salaryMax !== null) {
      return `<= ${job.salaryMax.toLocaleString()} ${job.currency}`;
    }
    return 'Competitive salary';
  };

  const postedByEmail = job.postedBy?.email || '';
  const postedByName = job.postedBy?.firstName 
    ? `${job.postedBy.firstName} ${job.postedBy.lastName || ''}` 
    : 'Platform Employer';

  const postedById = job.postedBy?._id || job.postedBy;

  return (
    <div className="space-y-6 w-full text-left">
      {/* Overview stats panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-5">
        <h3 className="text-md font-bold text-white border-b border-slate-800 pb-3">Job Overview</h3>
        
        <div className="space-y-4">
          {/* Salary info */}
          <div className="flex items-start space-x-3">
            <FiDollarSign className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Salary Offer</span>
              <span className="text-sm font-bold text-slate-200">{formattedSalary()}</span>
            </div>
          </div>

          {/* Vacancies info */}
          <div className="flex items-start space-x-3">
            <FiUsers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Open Vacancies</span>
              <span className="text-sm font-bold text-slate-200">{job.vacancies} {job.vacancies === 1 ? 'position' : 'positions'}</span>
            </div>
          </div>

          {/* Deadline info */}
          <div className="flex items-start space-x-3">
            <FiClock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Apply Before</span>
              <span className="text-sm font-bold text-slate-200">{formattedDeadline}</span>
            </div>
          </div>
          
          {/* Metrics (if available in Detail) */}
          <div className="flex items-start space-x-3">
            <FiLayers className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Listing Views</span>
              <span className="text-sm font-bold text-slate-200">{job.viewsCount || 0} hits</span>
            </div>
          </div>
        </div>
        
        {/* Actions Button */}
        <div className="pt-2">
          {(!user || user.role === 'job_seeker') ? (
            hasApplied ? (
              <button 
                type="button"
                disabled
                className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 font-bold rounded-xl cursor-not-allowed text-center text-sm"
              >
                ✓ Already Applied
              </button>
            ) : (
              <button 
                type="button"
                onClick={onApply}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-350"
              >
                Apply for this Job
              </button>
            )
          ) : (user.role === 'employer' && postedById === user.id) ? (
            <Link
              to={`/employer/jobs/${job.id}/applicants`}
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold rounded-xl border border-slate-750 text-center transition-all block"
            >
              Manage Applicants
            </Link>
          ) : (
            <div className="text-center text-xs text-slate-500 italic py-2">
              Viewing as Employer
            </div>
          )}
        </div>
      </div>

      {/* Posted By panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
        <h3 className="text-md font-bold text-white border-b border-slate-800 pb-3">Contact Information</h3>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center font-bold text-slate-400 border border-slate-850 shrink-0">
            {postedByName.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <span className="block text-xs font-bold text-slate-200 truncate">{postedByName}</span>
            <span className="text-[10px] text-slate-500 font-medium block">Job Poster</span>
          </div>
        </div>
        {postedByEmail && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2 border-t border-slate-800/50">
            <FiMail className="text-slate-500 shrink-0" />
            <span className="truncate">{postedByEmail}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSidebar;
