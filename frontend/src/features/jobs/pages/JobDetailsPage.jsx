import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import useJob from '../hooks/useJob';
import JobHeader from '../components/JobHeader';
import JobSidebar from '../components/JobSidebar';
import ErrorState from '../components/ErrorState';

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const { job, loading, error, refetch } = useJob(jobId);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-7xl mx-auto px-6 py-10 space-y-8 w-full">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 h-40 animate-pulse"></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-900/40 border border-slate-800 rounded-3xl animate-pulse"></div>
          <div className="h-60 bg-slate-900/40 border border-slate-800 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 w-full">
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 w-full text-center">
        <FiAlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-xl font-bold">Job Listing Not Found</h3>
        <p className="text-sm text-slate-400 mt-2">The job posting you are trying to view does not exist or has been deleted.</p>
        <Link to="/jobs" className="mt-6 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-20 text-left">
      {/* Upper Navigation Row */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-10 pb-6 flex items-center space-x-4">
        <Link 
          to="/jobs" 
          className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Job Board</span>
          <span className="text-sm font-bold text-slate-300">Job Detail Specification</span>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 space-y-8">
        {/* Main Header Banner */}
        <JobHeader job={job} />

        {/* Content Split Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Detailed Specifications Column (Left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Block */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Role Overview</h3>
              <p className="text-sm text-slate-350 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {/* Responsibilities Block */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Key Responsibilities</h3>
              <p className="text-sm text-slate-350 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
            </div>

            {/* Requirements Block */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Requirements & Skills</h3>
              <p className="text-sm text-slate-350 leading-relaxed whitespace-pre-line">{job.requirements}</p>
            </div>
            
            {/* Skills chip display row */}
            {job.skillsRequired && job.skillsRequired.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Required Technologies</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-950 text-sky-400 border border-slate-850 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits display row */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Benefits & Perks</h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {job.benefits.map((benefit, index) => (
                    <span 
                      key={index} 
                      className="px-3.5 py-1.5 text-xs font-bold bg-slate-950 text-indigo-400 border border-slate-850 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Sidebar (Right) */}
          <div className="lg:col-span-1">
            <JobSidebar job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
