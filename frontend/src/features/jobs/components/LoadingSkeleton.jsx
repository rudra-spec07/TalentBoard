import React from 'react';

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 h-36 animate-pulse flex flex-col justify-between space-y-4 w-full"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 shrink-0"></div>
              <div className="space-y-2">
                <div className="w-48 h-5 bg-slate-800 rounded"></div>
                <div className="w-32 h-3.5 bg-slate-800 rounded"></div>
              </div>
            </div>
            <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-16 h-5 bg-slate-800 rounded-full"></div>
            <div className="w-24 h-5 bg-slate-800 rounded-full"></div>
            <div className="w-20 h-5 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
