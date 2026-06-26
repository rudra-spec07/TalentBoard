import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export const EmptySearch = ({ message, onClear }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto w-full">
      <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-slate-650 mx-auto border border-slate-850">
        <FiAlertCircle className="w-7 h-7 text-slate-500" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">No Matching Listings</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {message || 'No job opportunities found matching your filters. Try checking other keywords or widening your salary threshold.'}
        </p>
      </div>
      {onClear && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onClear}
            className="px-5 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptySearch;
