import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSliders, FiPlusCircle, FiArrowLeft, FiX } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useJobSearch from '../hooks/useJobSearch';
import JobList from '../components/JobList';

import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ActiveFilters from '../components/ActiveFilters';
import SortDropdown from '../components/SortDropdown';
import SearchSummary from '../components/SearchSummary';
import Pagination from '../components/Pagination';
import SearchSkeleton from '../components/SearchSkeleton';
import EmptySearch from '../components/EmptySearch';
import SearchError from '../components/SearchError';

export const JobsPage = () => {
  const { user } = useAuth();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { 
    jobs, 
    pagination, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    changePage, 
    refetch 
  } = useJobSearch();

  const handleClearSidebarFilters = () => {
    updateFilters({
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
      skills: ''
    });
  };

  const handleClearAllFilters = () => {
    updateFilters({
      keyword: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
      skills: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-20 text-left">
      {/* Header Overview Banner */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur px-6 py-4 w-full sticky top-0 z-40">
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

        {/* Search & Sort Header Row */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <SearchBar 
            value={filters.keyword} 
            onChange={(val) => updateFilters({ keyword: val, page: 1 })} 
          />
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-350 hover:text-white font-bold text-xs rounded-xl transition-all"
            >
              <FiSliders className="text-sky-500" />
              <span>Filters</span>
            </button>
            <SortDropdown 
              sortBy={filters.sortBy} 
              sortOrder={filters.sortOrder} 
              onChange={(updates) => updateFilters({ ...updates, page: 1 })} 
            />
          </div>
        </div>

        {/* Results summary and Active Filter Chips */}
        <div className="space-y-2 mb-6">
          <SearchSummary 
            totalItems={pagination?.totalItems || jobs.length} 
            filters={filters} 
          />
          <ActiveFilters 
            filters={filters} 
            onRemove={updateFilters} 
          />
        </div>

        {/* Split view */}
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Left filter options (hidden on mobile, fixed sidebar on desktop) */}
          <div className="hidden lg:block lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="font-bold text-white flex items-center space-x-2">
                <FiSliders className="text-sky-500" />
                <span>Filters</span>
              </span>
              <button 
                onClick={handleClearSidebarFilters}
                className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-sky-400 transition-colors"
              >
                Clear all
              </button>
            </div>
            <FilterPanel 
              filters={filters} 
              onChange={updateFilters} 
            />
          </div>

          {/* Right job feeds column */}
          <div className="lg:col-span-3 space-y-6 w-full">
            {loading ? (
              <SearchSkeleton count={3} />
            ) : error ? (
              <SearchError message={error} onRetry={refetch} />
            ) : jobs.length === 0 ? (
              <EmptySearch 
                message="We couldn't find any active job postings matching your filters. Try checking other keywords or widening your salary threshold." 
                onClear={handleClearAllFilters}
              />
            ) : (
              <JobList 
                jobs={jobs}
                loading={false}
                error={null}
                isEmployer={false}
              />
            )}

            {/* Pagination Controls */}
            {!loading && !error && pagination && pagination.totalPages > 1 && (
              <Pagination 
                currentPage={pagination.currentPage} 
                totalPages={pagination.totalPages} 
                onPageChange={changePage} 
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
          {/* Drawer Content */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-slate-900 p-6 shadow-2xl border-l border-slate-850 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <FiSliders className="text-sky-500" />
                <span>Filters</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel 
              filters={filters} 
              onChange={updateFilters} 
            />
            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-xl transition-all"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
