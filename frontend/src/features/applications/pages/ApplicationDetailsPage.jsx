import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplication } from '../services/application.api';
import ApplicationTimeline from '../components/ApplicationTimeline';
import StatusBadge from '../components/StatusBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';

export const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getApplication(id);
      setApp(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error loading application details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <LoadingSkeleton type="list" count={1} />
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
          <svg className="w-12 h-12 text-rose-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold">Failed to load details</h2>
          <p className="text-slate-400 text-sm">The application might have been withdrawn or does not exist.</p>
          <div className="flex gap-4">
            <Link to="/applications" className="w-1/2 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all text-sm block">
              Go Back
            </Link>
            <button onClick={() => fetchDetail()} className="w-1/2 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all text-sm">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-400 font-medium space-x-2">
          <Link to="/applications" className="hover:text-white transition-colors">Applications</Link>
          <span className="text-slate-650">/</span>
          <span className="text-slate-200">Details</span>
        </nav>

        {/* Header summary panel */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{app.jobTitle}</h1>
            <p className="text-sm text-slate-400 font-medium">{app.companyName}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={app.status} />
            {app.withdrawn && (
              <span className="px-2 py-0.5 text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold rounded-full">
                Withdrawn
              </span>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Progress timeline (2/3 width) */}
          <div className="md:col-span-2 space-y-6">
            {/* Cover letter card */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <h2 className="text-lg font-bold text-slate-250 border-b border-slate-800 pb-3">
                Cover Letter Submitted
              </h2>
              {app.coverLetter ? (
                <p className="text-xs text-slate-350 leading-relaxed whitespace-pre-wrap">
                  {app.coverLetter}
                </p>
              ) : (
                <p className="text-xs text-slate-500 italic">No cover letter was submitted with this application.</p>
              )}
            </div>

            {/* AI Insights placeholder (Phase 6 hook) */}
            <div className="p-6 bg-slate-900/50 border border-slate-850 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-sky-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-bold text-sm">AI Fit & Suitability Metrics</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Resume matching, skill gap highlights, and parsed insights will appear here in Phase 6. Keep your profile updated!
              </p>
            </div>
          </div>

          {/* Right: Stepper Checklist Timeline (1/3 width) */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl h-fit">
            <h2 className="text-lg font-bold text-slate-250 border-b border-slate-800 pb-4 mb-6">
              Application Steps
            </h2>
            <ApplicationTimeline 
              currentStatus={app.status} 
              appliedAt={app.appliedAt}
              reviewedAt={app.reviewedAt}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
