import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [adminJobs, setAdminJobs] = useState([]);
  const [loadingAdminJobs, setLoadingAdminJobs] = useState(false);
  const [errorAdminJobs, setErrorAdminJobs] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchAdminJobs = async () => {
        setLoadingAdminJobs(true);
        setErrorAdminJobs(null);
        try {
          const response = await api.get('/v1/jobs/admin');
          if (response.data && response.data.success) {
            setAdminJobs(response.data.data.items || []);
          }
        } catch (err) {
          console.error(err);
          setErrorAdminJobs('Failed to retrieve system job audit list.');
        } finally {
          setLoadingAdminJobs(false);
        }
      };
      fetchAdminJobs();
    }
  }, [user]);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job listing globally?')) return;
    try {
      await api.delete(`/v1/jobs/${jobId}`);
      setAdminJobs(prev => prev.filter(j => j.id !== jobId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete job listing.');
    }
  };

  const renderRoleDashboard = () => {
    switch (user?.role) {
      case 'job_seeker':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">My Application Portal</h3>
              <p className="text-sm text-slate-400 mb-6">
                Upload your resume and analyze matches against active role listings.
              </p>
              <div className="border border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-950/50 hover:border-sky-500/40 transition-colors cursor-pointer group">
                <span className="text-slate-500 group-hover:text-sky-400 block text-3xl mb-2">↑</span>
                <span className="text-xs text-slate-400 block font-semibold">Upload PDF/DOCX Resume</span>
                <span className="text-[10px] text-slate-600 block mt-1">Maximum file size: 5MB</span>
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Explore Opportunities</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Browse and search matching job roles verified by AI and screening models.
                </p>
              </div>
              <Link 
                to="/jobs" 
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 text-center transition-all block"
              >
                Browse Job Board
              </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">My Applications History</h3>
                <p className="text-sm text-slate-400">Track and manage your active application progress, interview schedules, and hiring outcomes.</p>
              </div>
              <Link 
                to="/applications" 
                className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold rounded-xl border border-slate-750 text-center transition-all block mt-6"
              >
                View Applications History
              </Link>
            </div>
          </div>
        );
      case 'employer':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Employer Core Actions</h3>
              <p className="text-sm text-slate-400 mb-6">Manage job posts and view applicant matches.</p>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/employer/jobs/create" className="p-4 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl text-center transition-all block group">
                  <span className="block text-2xl mb-1 text-sky-400">⊕</span>
                  <span className="text-xs font-bold text-white block">Post a Job</span>
                </Link>
                <Link to="/employer/jobs" className="p-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-center transition-all block group">
                  <span className="block text-2xl mb-1 text-indigo-400">👁</span>
                  <span className="text-xs font-bold text-white block">Manage Listings</span>
                </Link>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Candidate Matches</h3>
              <p className="text-sm text-slate-400 mb-6">AI reports from recent application screeners.</p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Alice Johnson</h4>
                    <span className="text-[10px] text-slate-500">React Dev Applicant</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">92% Match</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Bob Smith</h4>
                    <span className="text-[10px] text-slate-550">Node JS Applicant</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">64% Match</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-8 text-left">
            {/* Header banner with Post a Job action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">System Admin Control Center</h2>
                <p className="text-xs text-slate-400 mt-1">Audit platform postings, manage connections, and post new listings.</p>
              </div>
              <Link 
                to="/employer/jobs/create" 
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all flex items-center gap-1.5"
              >
                <span>➕</span>
                <span>Post a Job</span>
              </Link>
            </div>

            {/* Stats Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Postings</span>
                <span className="text-2xl font-extrabold text-white">{adminJobs.length}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Open</span>
                <span className="text-2xl font-extrabold text-emerald-400">{adminJobs.filter(j => j.status === 'open').length}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Draft Listings</span>
                <span className="text-2xl font-extrabold text-amber-400">{adminJobs.filter(j => j.status === 'draft').length}</span>
              </div>
            </div>

            {/* Global listings audit */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Global Job Listings Audit</h3>
                <p className="text-xs text-slate-400 mt-1">Moderate job postings, view candidates, edit or delete listings globally.</p>
              </div>

              {loadingAdminJobs ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-10 bg-slate-800 rounded-xl w-full"></div>
                  <div className="h-10 bg-slate-800 rounded-xl w-full"></div>
                </div>
              ) : errorAdminJobs ? (
                <div className="text-rose-400 text-sm p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">{errorAdminJobs}</div>
              ) : adminJobs.length === 0 ? (
                <div className="text-slate-550 text-xs italic py-4 text-center">No postings exist on the platform.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="pb-3 pr-4">Job Title</th>
                        <th className="pb-3 px-4">Company</th>
                        <th className="pb-3 px-4">Status</th>
                        <th className="pb-3 px-4">Applicants</th>
                        <th className="pb-3 pl-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {adminJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-850/30 transition-colors">
                          <td className="py-4 pr-4 font-bold text-slate-200">{job.title}</td>
                          <td className="py-4 px-4 text-slate-400">{job.companyName}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-0.5 font-bold rounded-full text-[10px] border ${
                              job.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              job.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-350">{job.totalApplications || 0}</td>
                          <td className="py-4 pl-4 text-right space-x-2 whitespace-nowrap">
                            <Link
                              to={`/employer/jobs/${job.id}/applicants`}
                              className="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 rounded-lg font-bold"
                            >
                              Applicants
                            </Link>
                            <Link
                              to={`/employer/jobs/${job.id}/edit`}
                              className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded-lg font-bold"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteJob(job.id)}
                              className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-450 rounded-lg font-bold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4">
            <svg className="w-12 h-12 text-rose-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-bold text-white">Access Denied</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You do not have the credentials required to view this dashboard workspace. Please contact system support.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow">
              <span className="text-white font-bold text-md">X</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <Link to="/profile" className="text-sm font-bold text-slate-200 hover:text-sky-400 transition-colors">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.email || 'User'}
              </Link>
              <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-lg transition-all"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-lg transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent border border-sky-500/10 rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Hello, {user?.firstName || 'User'}!</h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Welcome to your **TalentBoardX** workspace. Here you can find matching scores, manage configurations, and perform action tasks.
              </p>
            </div>
            <Link
              to="/profile"
              className="self-start md:self-auto px-6 py-3 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300 shrink-0"
            >
              Complete Profile Setup
            </Link>
          </div>
        </div>

        {/* Dynamic Panels */}
        {renderRoleDashboard()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600 w-full mt-auto">
        &copy; 2026 TalentBoardX Portal. Secure Admin Session.
      </footer>
    </div>
  );
};

export default DashboardPage;
