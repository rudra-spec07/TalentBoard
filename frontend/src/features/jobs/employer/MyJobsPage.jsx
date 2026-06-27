import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlusCircle, FiCalendar, FiClock, FiFileText, FiLayers } from 'react-icons/fi';
import useEmployerJobs from '../hooks/useEmployerJobs';
import useUpdateJob from '../hooks/useUpdateJob';
import useDeleteJob from '../hooks/useDeleteJob';
import JobList from '../components/JobList';
import { JOB_STATUS } from '../constants/job.constants';
import useAuth from '../../../hooks/useAuth';

export const MyJobsPage = () => {
  const { jobs, loading, error, refetch } = useEmployerJobs();
  const { publish, close, reopen, isSubmitting: isUpdating } = useUpdateJob();
  const { remove } = useDeleteJob();
  const { user } = useAuth();
  const isSystemAdmin = user?.role === 'admin';

  // Reopen Modal state
  const [reopenJobId, setReopenJobId] = useState(null);
  const [newDeadline, setNewDeadline] = useState('');
  const [modalError, setModalError] = useState('');

  const handlePublish = async (id) => {
    if (window.confirm('Are you sure you want to publish this job posting? It will go live immediately.')) {
      try {
        await publish(id);
        refetch();
      } catch (err) {
        alert(err.message || 'Failed to publish job.');
      }
    }
  };

  const handleClose = async (id) => {
    if (window.confirm('Are you sure you want to close this job listing? Candidates will no longer be able to apply.')) {
      try {
        await close(id);
        refetch();
      } catch (err) {
        alert(err.message || 'Failed to close job.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing? This action cannot be undone.')) {
      try {
        await remove(id);
        refetch();
      } catch (err) {
        alert(err.message || 'Failed to delete job.');
      }
    }
  };

  const handleOpenReopenModal = (id) => {
    setReopenJobId(id);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7); // Default to 7 days from now
    setNewDeadline(tomorrow.toISOString().split('T')[0]);
    setModalError('');
  };

  const handleReopenSubmit = async (e) => {
    e.preventDefault();
    if (!newDeadline) {
      setModalError('Please specify a valid future deadline date.');
      return;
    }
    if (new Date(newDeadline) <= new Date()) {
      setModalError('Application deadline must be in the future.');
      return;
    }

    try {
      await reopen(reopenJobId, newDeadline);
      setReopenJobId(null);
      refetch();
    } catch (err) {
      setModalError(err.message || 'Failed to reopen job listing.');
    }
  };

  // Metrics computation
  const totalPostings = jobs?.length || 0;
  const activePostings = jobs?.filter(j => j.status === JOB_STATUS.OPEN).length || 0;
  const draftPostings = jobs?.filter(j => j.status === JOB_STATUS.DRAFT).length || 0;
  const closedPostings = jobs?.filter(j => j.status === JOB_STATUS.CLOSED || j.status === JOB_STATUS.EXPIRED).length || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-20 text-left">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 w-full sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition-colors mr-1">
              <FiArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-xl tracking-tight text-white">
              {isSystemAdmin ? 'Admin Control Center' : 'Employer Dashboard'}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/employer/jobs/create" 
              className="px-4 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg flex items-center space-x-1.5 transition-all shadow-md shadow-sky-500/10"
            >
              <FiPlusCircle />
              <span>Create New Posting</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Title row */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isSystemAdmin ? 'All Platform Postings' : 'My Job Postings'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isSystemAdmin 
              ? 'Manage and audit all platform listings, publish drafts, and track applicants.' 
              : 'Manage and audit your company listings, publish drafts, and track applicants.'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <FiLayers className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Listings</span>
              <span className="text-xl font-extrabold text-white">{totalPostings}</span>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <FiClock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Open</span>
              <span className="text-xl font-extrabold text-white">{activePostings}</span>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <FiFileText className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Draft Listings</span>
              <span className="text-xl font-extrabold text-white">{draftPostings}</span>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-455">
              <FiCalendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Closed/Expired</span>
              <span className="text-xl font-extrabold text-white">{closedPostings}</span>
            </div>
          </div>
        </div>

        {/* JobList container */}
        <div className="w-full">
          <JobList 
            jobs={jobs}
            loading={loading}
            error={error}
            isEmployer={true}
            onRetry={refetch}
            onPublish={handlePublish}
            onClose={handleClose}
            onDelete={handleDelete}
            onReopen={handleOpenReopenModal}
            emptyMessage="No job listings found. Click 'Create New Posting' to get started."
          />
        </div>
      </main>

      {/* Reopen Date Picker Modal */}
      {reopenJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Reopen Job Posting</h3>
            <p className="text-xs text-slate-400 mb-6">Select a new future application deadline to reactivate this listing.</p>

            <form onSubmit={handleReopenSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  New Deadline Date
                </label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
                />
              </div>

              {modalError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-455">
                  {modalError}
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReopenJobId(null)}
                  disabled={isUpdating}
                  className="px-4 py-2.5 text-xs font-bold bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2.5 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl transition-all shadow-lg shadow-sky-500/10"
                >
                  {isUpdating ? 'Reopening...' : 'Reopen Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
