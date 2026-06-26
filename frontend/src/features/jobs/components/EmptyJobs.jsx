import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

export const EmptyJobs = ({ message = 'No job postings found matching your search criteria.' }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 text-center max-w-lg mx-auto shadow-lg backdrop-blur-md space-y-4 w-full">
      <FiBriefcase className="w-12 h-12 text-slate-600 mx-auto" />
      <h3 className="text-lg font-bold text-white">No Jobs Listed</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
    </div>
  );
};

export default EmptyJobs;
