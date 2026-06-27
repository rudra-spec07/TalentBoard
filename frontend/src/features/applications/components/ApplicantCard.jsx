import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import StatusDropdown from './StatusDropdown';
import { useUpdateApplicationStatus } from '../hooks/useUpdateApplicationStatus';

export const ApplicantCard = ({ applicant, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutate: changeStatus, isPending } = useUpdateApplicationStatus();

  const handleStatusChange = (targetStatus) => {
    changeStatus(
      { id: applicant.id, status: targetStatus },
      {
        onSuccess: () => {
          if (onStatusChange) onStatusChange();
        }
      }
    );
  };

  const name = applicant.applicant 
    ? `${applicant.applicant.firstName} ${applicant.applicant.lastName}`
    : 'Candidate';

  const email = applicant.applicant?.email || '';

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-slate-750 transition-all space-y-4">
      {/* Upper Candidate overview header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-slate-100">{name}</h3>
            <StatusBadge status={applicant.status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
            <a href={`mailto:${email}`} className="hover:text-sky-400 transition-colors flex items-center">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </a>
            <span className="text-slate-600">|</span>
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Applied on {new Date(applicant.appliedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center">
          <a
            href={applicant.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>

          <StatusDropdown 
            currentStatus={applicant.status}
            onSelect={handleStatusChange}
            isLoading={isPending}
          />
        </div>
      </div>

      {/* Future AI Extension Hooks (Placeholder Slots for Phase 6) */}
      <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-sky-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="font-semibold text-slate-400">AI Compatibility Scoring</span>
        </div>
        <span className="italic">AI Resume analysis pending (available in Phase 6)</span>
      </div>

      {/* Cover Letter Section */}
      {applicant.coverLetter && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-sky-400 hover:text-sky-300 font-bold transition-colors flex items-center"
          >
            {isExpanded ? 'Hide Cover Letter' : 'Show Cover Letter'}
            <svg className={`w-3.5 h-3.5 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExpanded && (
            <div className="mt-3 p-4 bg-slate-950/60 border border-slate-850 rounded-2xl text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
              {applicant.coverLetter}
            </div>
          )}
        </div>
      )}

      {/* Employer Notes if present */}
      {applicant.notes && (
        <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] text-amber-300">
          <strong>Review Notes:</strong> {applicant.notes}
        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
