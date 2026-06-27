import React, { useState } from 'react';
import { getAvailableTransitions } from '../utils/statusTransition';
import { getStatusLabel } from '../utils/statusColor';

export const StatusDropdown = ({ currentStatus, onSelect, isLoading }) => {
  const allowed = getAvailableTransitions(currentStatus);
  const [isOpen, setIsOpen] = useState(false);

  // If no transitions are allowed (terminal states selected/rejected), hide button
  if (allowed.length === 0) {
    return (
      <span className="text-xs text-slate-500 italic">No further actions available</span>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-sm font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Action'}
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          {/* Backdrop screen click trap */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-slate-950 border border-slate-850 z-20 overflow-hidden focus:outline-none">
            <div className="py-1">
              {allowed.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onSelect(status);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDropdown;
