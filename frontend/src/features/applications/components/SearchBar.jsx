import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = 'Search candidates by name...' }) => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 text-sm placeholder-slate-550 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all"
      />
    </div>
  );
};

export default SearchBar;
