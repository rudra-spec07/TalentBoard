import React from 'react';

/**
 * Text statement showing the current matches count.
 */
export const SearchSummary = ({ totalItems = 0, filters }) => {
  const getSummaryText = () => {
    let parts = [];
    if (filters.keyword) {
      parts.push(`"${filters.keyword}"`);
    }
    if (filters.location) {
      parts.push(`in "${filters.location}"`);
    }

    const summary = parts.join(' ');
    
    if (totalItems === 0) {
      return `No jobs found ${summary}`;
    }

    return `Found ${totalItems} open listing${totalItems === 1 ? '' : 's'} ${summary}`;
  };

  return (
    <div className="text-xs font-semibold text-slate-400 text-left">
      {getSummaryText()}
    </div>
  );
};

export default SearchSummary;
