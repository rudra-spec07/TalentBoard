import React from 'react';
import { JOB_STATUS } from '../constants/job.constants';

export const JobStatusBadge = ({ status }) => {
  const styles = {
    [JOB_STATUS.DRAFT]: 'bg-slate-800 text-slate-400 border-slate-700/50',
    [JOB_STATUS.OPEN]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [JOB_STATUS.CLOSED]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    [JOB_STATUS.EXPIRED]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [JOB_STATUS.DELETED]: 'bg-slate-900 text-slate-500 border-slate-800',
    [JOB_STATUS.ARCHIVED]: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  };

  const labels = {
    [JOB_STATUS.DRAFT]: 'Draft',
    [JOB_STATUS.OPEN]: 'Open',
    [JOB_STATUS.CLOSED]: 'Closed',
    [JOB_STATUS.EXPIRED]: 'Expired',
    [JOB_STATUS.DELETED]: 'Deleted',
    [JOB_STATUS.ARCHIVED]: 'Archived'
  };

  const styleClass = styles[status] || styles[JOB_STATUS.DRAFT];
  const label = labels[status] || 'Unknown';

  return (
    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${styleClass}`}>
      {label}
    </span>
  );
};

export default JobStatusBadge;
