import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import useDebounce from '../hooks/useDebounce';

/**
 * Keyword search input component with debounce checks.
 */
export const SearchBar = ({ value = '', onChange }) => {
  const [localKeyword, setLocalKeyword] = useState(value);
  const debouncedKeyword = useDebounce(localKeyword, 350);

  // Sync local input state with query params resets
  useEffect(() => {
    setLocalKeyword(value);
  }, [value]);

  // Bubble up the value only after debouncing completes
  useEffect(() => {
    if (debouncedKeyword !== value) {
      onChange(debouncedKeyword);
    }
  }, [debouncedKeyword, value, onChange]);

  const handleClear = () => {
    setLocalKeyword('');
    onChange('');
  };

  return (
    <div className="relative w-full flex-1">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
      <input
        type="text"
        value={localKeyword}
        onChange={(e) => setLocalKeyword(e.target.value)}
        placeholder="Search by job title, company, or keywords..."
        className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all text-sm"
        aria-label="Search jobs input"
      />
      {localKeyword && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors p-1"
          aria-label="Clear search input"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
