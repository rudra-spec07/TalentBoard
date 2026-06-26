import React from 'react';

export const SearchSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 h-40 animate-pulse flex flex-col justify-between"
        >
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 shrink-0"></div>
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-slate-800 rounded w-1/3"></div>
              <div className="h-3 bg-slate-800 rounded w-1/4"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2 pt-2"></div>
            </div>
          </div>
          <div className="border-t border-slate-850 pt-4 flex items-center justify-between">
            <div className="h-3 bg-slate-800 rounded w-1/4"></div>
            <div className="h-8 bg-slate-800 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
