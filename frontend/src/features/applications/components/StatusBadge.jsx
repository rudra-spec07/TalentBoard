import React from 'react';
import { getStatusColors, getStatusLabel } from '../utils/statusColor';

export const StatusBadge = ({ status }) => {
  const { bg, text, border } = getStatusColors(status);
  const label = getStatusLabel(status);

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${bg} ${text} ${border} transition-all`}
      role="status"
      aria-label={`Application Status: ${label}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
      {label}
    </span>
  );
};

export default StatusBadge;
