import React from 'react';
import { APPLICATION_STATUS } from '../constants/application.constants';

export const ApplicationTimeline = ({ currentStatus, appliedAt, reviewedAt }) => {
  const steps = [
    { key: APPLICATION_STATUS.APPLIED, label: 'Applied', date: appliedAt },
    { key: APPLICATION_STATUS.UNDER_REVIEW, label: 'Under Review', date: reviewedAt },
    { key: APPLICATION_STATUS.SHORTLISTED, label: 'Shortlisted' },
    { key: APPLICATION_STATUS.INTERVIEW_SCHEDULED, label: 'Interview Scheduled' },
    { key: APPLICATION_STATUS.SELECTED, label: 'Hired / Completed' }
  ];

  // If rejected, replace selected step with Rejected state
  const isRejected = currentStatus === APPLICATION_STATUS.REJECTED;
  const activeIndex = steps.findIndex(step => step.key === currentStatus);

  const getStepStatus = (index) => {
    if (isRejected && index === activeIndex) return 'rejected';
    if (index < activeIndex) return 'completed';
    if (index === activeIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {steps.map((step, idx) => {
          // If candidate is rejected, we customize the visual timeline node at the active index
          const state = getStepStatus(idx);
          const showConnector = idx < steps.length - 1;
          const displayLabel = isRejected && idx === activeIndex ? 'Rejected' : step.label;

          return (
            <li key={step.key || idx}>
              <div className="relative pb-8">
                {showConnector && (
                  <span 
                    className="absolute top-4 left-4 -ml-0.5 h-full w-0.5 bg-slate-800" 
                    aria-hidden="true" 
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-slate-950 transition-all ${
                      state === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      state === 'active' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 animate-pulse' :
                      state === 'rejected' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' :
                      'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {state === 'completed' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {(state === 'active' || state === 'upcoming') && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                      {state === 'rejected' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className={`text-sm font-semibold ${
                        state === 'completed' ? 'text-slate-300' :
                        state === 'active' ? 'text-white' :
                        state === 'rejected' ? 'text-rose-400 font-bold' :
                        'text-slate-500'
                      }`}>
                        {displayLabel}
                      </p>
                    </div>
                    {step.date && (
                      <div className="text-right text-xs whitespace-nowrap text-slate-500">
                        <time dateTime={step.date}>
                          {new Date(step.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ApplicationTimeline;
