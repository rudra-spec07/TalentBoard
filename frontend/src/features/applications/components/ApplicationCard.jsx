import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import WithdrawButton from './WithdrawButton';
import { useWithdrawApplication } from '../hooks/useWithdrawApplication';
import { APPLICATION_STATUS } from '../constants/application.constants';

export const ApplicationCard = ({ application, onStatusChange }) => {
  const { mutate: withdraw, isPending } = useWithdrawApplication();

  const handleWithdraw = () => {
    withdraw(application.id, {
      onSuccess: () => {
        if (onStatusChange) onStatusChange();
      }
    });
  };

  // Only allow withdrawal if currentStatus is strictly APPLIED
  const canWithdraw = application.status === APPLICATION_STATUS.APPLIED && !application.withdrawn;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all group">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={application.status} />
          {application.withdrawn && (
            <span className="px-2 py-0.5 text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold rounded-full">
              Withdrawn
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
            {application.jobTitle}
          </h3>
          <p className="text-sm text-slate-400 font-medium">{application.companyName}</p>
        </div>
        <div className="flex items-center text-xs text-slate-500 font-medium">
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Applied on {new Date(application.appliedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0">
        <Link
          to={`/applications/${application.id}`}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition-all text-center shrink-0"
        >
          View Timeline
        </Link>
        {canWithdraw && (
          <WithdrawButton 
            onWithdraw={handleWithdraw} 
            isLoading={isPending}
            className="sm:mr-2"
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
