import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useJob from '../../../jobs/hooks/useJob';
import { useApplicants } from '../../hooks/useApplicants';
import ApplicantCard from '../../components/ApplicantCard';
import FilterPanel from '../../components/FilterPanel';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';

export const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Retrieve job details to show header info using standard hook
  const { job, loading: jobLoading } = useJob(jobId);

  // Debounce search candidate names input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset page on filter update
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError, refetch } = useApplicants(jobId, {
    status: statusFilter || undefined,
    page: currentPage,
    limit
  });

  let applicants = data?.data?.items || [];
  const pagination = data?.data?.pagination || { totalPages: 1 };

  // Local substring name search filter
  if (debouncedSearch) {
    const term = debouncedSearch.toLowerCase();
    applicants = applicants.filter((app) => {
      const name = app.applicant 
        ? `${app.applicant.firstName} ${app.applicant.lastName}`.toLowerCase()
        : '';
      return name.includes(term);
    });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-400 font-medium space-x-2">
          <Link to="/employer/jobs" className="hover:text-white transition-colors">My Postings</Link>
          <span className="text-slate-650">/</span>
          <span className="text-slate-200">Applicants</span>
        </nav>

        {/* Job Header */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Applicants Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Review and transition statuses for candidates applying to <strong className="text-slate-250 font-bold">{jobLoading ? 'Loading...' : job?.title}</strong>
          </p>
        </div>

        {/* Filter dashboard board */}
        <div className="bg-slate-900 p-6 border border-slate-800 rounded-3xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Search candidate names..." 
            />
          </div>
          
          <div className="border-t border-slate-850 pt-4">
            <FilterPanel 
              activeStatus={statusFilter} 
              onStatusChange={handleStatusChange} 
            />
          </div>
        </div>

        {/* Applicant list table */}
        {isLoading || jobLoading ? (
          <LoadingSkeleton type="list" count={3} />
        ) : isError ? (
          <div className="p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-center">
            <p className="font-semibold mb-2">Failed to retrieve applicant candidates.</p>
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-xl transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : applicants.length === 0 ? (
          <EmptyState 
            title="No applicants found" 
            message="No job seekers have applied to this posting or matched your search filters yet." 
          />
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <ApplicantCard 
                key={app.id} 
                applicant={app} 
                onStatusChange={() => refetch()} 
              />
            ))}

            <Pagination 
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicantsPage;
