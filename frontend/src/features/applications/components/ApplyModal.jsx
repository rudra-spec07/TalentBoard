import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applyJobSchema } from '../schemas/application.schema';
import { useApplyJob } from '../hooks/useApplyJob';

export const ApplyModal = ({ job, user, hasApplied, onClose, onSuccess }) => {
  const { mutate: submitApplication, isPending } = useApplyJob();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(applyJobSchema),
    defaultValues: { coverLetter: '' }
  });

  const coverLetterValue = watch('coverLetter', '');

  const onSubmit = (data) => {
    submitApplication(
      { jobId: job.id, coverLetter: data.coverLetter },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
          onClose();
        }
      }
    );
  };

  const hasResume = !!user?.resumeUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Apply for Position</h2>
            <p className="text-xs text-slate-400 mt-1">{job.title} at {job.companyName}</p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Duplicate Application Warning */}
          {hasApplied && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-2xl flex items-center space-x-2 animate-fadeIn">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>You have already submitted an active application for this job posting. Duplicate applications are blocked.</span>
            </div>
          )}

          {/* Resume Checklist Card */}
          <div className="p-4 bg-slate-955 border border-slate-800/80 rounded-2xl">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Resume Attachment</h3>
            {hasResume ? (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>PDF Resume is attached from your Profile</span>
                </div>
                <a 
                  href={user.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline hover:text-sky-300 transition-colors font-medium"
                >
                  Preview Document
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start text-xs text-rose-400 leading-relaxed">
                  <svg className="w-5 h-5 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    No resume found on your profile. Please{' '}
                    <Link 
                      to="/profile" 
                      onClick={onClose} 
                      className="text-sky-400 hover:text-sky-350 hover:underline font-bold transition-all"
                    >
                      Go to Profile Settings
                    </Link>{' '}
                    to upload your resume PDF before applying.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="coverLetter" className="font-semibold text-slate-300">Cover Letter</label>
              <span className={`font-medium ${coverLetterValue.length > 5000 ? 'text-rose-400' : 'text-slate-500'}`}>
                {coverLetterValue.length} / 5000 chars
              </span>
            </div>
            <textarea
              id="coverLetter"
              rows={6}
              disabled={!hasResume || isPending}
              placeholder="Introduce yourself! Detail your technical skills, relevant MERN experience, and why you are a great fit..."
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all resize-none disabled:opacity-50"
              {...register('coverLetter')}
            />
            {errors.coverLetter && (
              <p className="text-xs text-rose-400 font-medium">{errors.coverLetter.message}</p>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="w-1/2 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 font-bold rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasResume || hasApplied || isPending}
              className="w-1/2 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
