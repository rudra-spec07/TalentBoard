import React from 'react';

export const EmptyState = ({ title = 'No results found', message = 'Try expanding your filters or search keywords.', icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center max-w-xl mx-auto my-8">
      {Icon ? (
        <div className="p-4 bg-slate-800/50 border border-slate-750 text-slate-500 rounded-full mb-4">
          <Icon className="w-8 h-8" />
        </div>
      ) : (
        <div className="p-4 bg-slate-800/50 border border-slate-750 text-slate-500 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-200 mb-1">{title}</h3>
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
