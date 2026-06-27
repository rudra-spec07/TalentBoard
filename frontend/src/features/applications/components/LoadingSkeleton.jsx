import React from 'react';

export const LoadingSkeleton = ({ type = 'list', count = 3 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <div className="h-6 bg-slate-800 rounded-lg w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-850 rounded-lg w-1/2 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-slate-850 rounded-lg w-full"></div>
              <div className="h-3 bg-slate-850 rounded-lg w-5/6"></div>
            </div>
            <div className="h-10 bg-slate-800 rounded-xl w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  // Default type: 'list' (applicant rows)
  return (
    <div className="space-y-4 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3 flex-1 w-full">
            <div className="h-5 bg-slate-800 rounded-lg w-1/3"></div>
            <div className="h-4 bg-slate-850 rounded-lg w-1/4"></div>
            <div className="h-3 bg-slate-850 rounded-lg w-1/2"></div>
          </div>
          <div className="h-10 bg-slate-800 rounded-xl w-28 shrink-0"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
