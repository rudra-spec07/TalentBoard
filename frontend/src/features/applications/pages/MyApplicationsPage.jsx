import React, { useState } from 'react';
import { useApplications } from '../hooks/useApplications';
import ApplicationCard from '../components/ApplicationCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export const MyApplicationsPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError, refetch } = useApplications({
    status: statusFilter || undefined,
    page: currentPage,
    limit
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset page on filter update
  };

  const applications = data?.data?.items || [];
  const pagination = data?.data?.pagination || { totalPages: 1 };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              My Applications
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Track the progress, interviews, and status updates of your active job applications.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/30 p-4 border border-slate-900 rounded-3xl">
          <FilterPanel 
            activeStatus={statusFilter} 
            onStatusChange={handleStatusChange} 
          />
        </div>

        {/* Content Body */}
        {isLoading ? (
          <LoadingSkeleton type="list" count={3} />
        ) : isError ? (
          <div className="p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-center">
            <p className="font-semibold mb-2">Failed to retrieve applications.</p>
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-xl transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : applications.length === 0 ? (
          <EmptyState 
            title="No applications found" 
            message={statusFilter ? "No applications matching this status filter." : "You haven't submitted any job applications yet."} 
          />
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard 
                key={app.id} 
                application={app} 
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

export default MyApplicationsPage;
