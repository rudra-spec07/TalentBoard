import React from 'react';
import { APPLICATION_STATUS } from '../constants/application.constants';
import { getStatusLabel } from '../utils/statusColor';

export const FilterPanel = ({ activeStatus, onStatusChange }) => {
  const statuses = [
    { key: '', label: 'All Statuses' },
    ...Object.values(APPLICATION_STATUS).map((status) => ({
      key: status,
      label: getStatusLabel(status)
    }))
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onStatusChange(item.key)}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
            activeStatus === item.key
              ? 'bg-sky-500 text-slate-950 border-sky-500 font-bold'
              : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border-slate-800'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
