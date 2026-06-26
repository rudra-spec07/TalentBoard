import React from 'react';
import { SORT_OPTIONS } from '../constants/search.constants';

/**
 * Dropdown selector converting string selection values to sorting configurations.
 */
export const SortDropdown = ({ sortBy = 'createdAt', sortOrder = 'desc', onChange }) => {
  const currentValue = `${sortBy}-${sortOrder}`;

  const handleChange = (e) => {
    const [by, order] = e.target.value.split('-');
    onChange({ sortBy: by, sortOrder: order });
  };

  return (
    <div className="flex items-center space-x-2 shrink-0">
      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">Sort By</span>
      <select
        value={currentValue}
        onChange={handleChange}
        className="px-3 py-2 bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 rounded-xl text-xs font-semibold cursor-pointer transition-all"
        aria-label="Sort listings dropdown"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
