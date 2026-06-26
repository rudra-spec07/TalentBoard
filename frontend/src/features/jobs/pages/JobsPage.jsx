import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiSliders, FiPlusCircle, FiArrowLeft } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useJobs from '../hooks/useJobs';
import JobList from '../components/JobList';
import { JOB_TYPE, EXPERIENCE_LEVEL } from '../constants/job.constants';

export const JobsPage = () => {
  const { user } = useAuth();
  const { 
    jobs, 
    pagination, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    changePage, 
    refetch 
  } = useJobs();

  const handleSearchChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  const handleClearFilters = () => {
    updateFilters({
      keyword: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: '',
      skills: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-20 text-left">
      {/* Header Overview Banner */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur px-6 py-4 w-full sticky top-0 z-45">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition-colors mr-1">
              <FiArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center space-x-2">
              <span>TalentBoardX Listings</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {user?.role === 'employer' && (
              <Link 
                to="/employer/jobs" 
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
              >
                My Postings
              </Link>
            )}
            {user?.role === 'employer' && (
              <Link 
                to="/employer/jobs/create" 
                className="px-4 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg flex items-center space-x-1.5 transition-all shadow-md shadow-sky-500/10"
              >
                <FiPlusCircle />
                <span>Post a Job</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 py-8">
        {/* Title row */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Discover Opportunities</h1>
          <p className="text-sm text-slate-400 mt-1">Explore matching roles verified by AI and screening models</p>
        </div>

        {/* Core Search Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-md mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by job title, company, or keywords..."
              value={filters.keyword}
              onChange={(e) => handleSearchChange('keyword', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all text-sm"
            />
          </div>

          <div className="relative w-full md:w-80">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="City, state, or Remote..."
              value={filters.location}
              onChange={(e) => handleSearchChange('location', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all text-sm"
            />
          </div>
        </div>

        {/* Split view */}
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Left filter options */}
          <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white flex items-center space-x-2">
                <FiSliders className="text-sky-500" />
                <span>Filters</span>
              </span>
              <button 
                onClick={handleClearFilters}
                className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-sky-400 transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-4">
              {/* Job type selection */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Job Type
                </label>
                <select
                  value={filters.jobType}
                  onChange={(e) => handleSearchChange('jobType', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-xs transition-all"
                >
                  <option value="">All Types</option>
                  <option value={JOB_TYPE.FULL_TIME}>Full-Time</option>
                  <option value={JOB_TYPE.PART_TIME}>Part-Time</option>
                  <option value={JOB_TYPE.CONTRACT}>Contract</option>
                  <option value={JOB_TYPE.INTERNSHIP}>Internship</option>
                  <option value={JOB_TYPE.REMOTE}>Remote</option>
                </select>
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => handleSearchChange('experienceLevel', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-xs transition-all"
                >
                  <option value="">All Experience Levels</option>
                  <option value={EXPERIENCE_LEVEL.ENTRY}>Entry Level</option>
                  <option value={EXPERIENCE_LEVEL.MID}>Mid Level</option>
                  <option value={EXPERIENCE_LEVEL.SENIOR}>Senior Level</option>
                  <option value={EXPERIENCE_LEVEL.LEAD}>Lead Role</option>
                  <option value={EXPERIENCE_LEVEL.DIRECTOR}>Director / Exec</option>
                </select>
              </div>

              {/* Salary Floor */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  placeholder="e.g. 60000"
                  value={filters.salaryMin}
                  onChange={(e) => handleSearchChange('salaryMin', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-xs transition-all"
                />
              </div>

              {/* Specific Skill Match */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Search Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. Node, React"
                  value={filters.skills}
                  onChange={(e) => handleSearchChange('skills', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 text-xs transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right job feeds column */}
          <div className="lg:col-span-3 space-y-6 w-full">
            <JobList 
              jobs={jobs}
              loading={loading}
              error={error}
              isEmployer={false}
              onRetry={refetch}
              emptyMessage="We couldn't find any active job postings matching your filters. Try clearing your search parameters."
            />

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6 border-t border-slate-900 w-full">
                <button
                  type="button"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => changePage(pagination.currentPage - 1)}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs font-bold text-slate-400 px-4">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => changePage(pagination.currentPage + 1)}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
