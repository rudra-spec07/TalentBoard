import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

export const ErrorState = ({ message = 'An error occurred while loading jobs.', onRetry }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center max-w-md mx-auto shadow-xl backdrop-blur-md space-y-4 w-full">
      <FiAlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
      <h3 className="text-lg font-bold text-white">Connection Error</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
};

export default ErrorState;
