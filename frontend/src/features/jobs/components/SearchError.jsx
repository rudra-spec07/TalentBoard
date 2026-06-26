import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export const SearchError = ({ message, onRetry }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto w-full">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 mx-auto border border-rose-500/20">
        <FiAlertTriangle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">Search Failed</h3>
        <p className="text-xs text-rose-400/80 mt-2 leading-relaxed">
          {message || 'An error occurred while communicating with the job search index. Please try again.'}
        </p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-xl transition-all"
          >
            Retry Connection
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchError;
