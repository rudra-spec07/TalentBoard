import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

/**
 * Numeric pagination navigator with bounds restrictions.
 */
export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Render centered list of numbers around the active page (max 5 page selections)
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1.5 pt-8 border-t border-slate-900 w-full text-xs font-bold text-slate-400">
      {/* First Page */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="p-2 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 rounded-lg disabled:opacity-20 disabled:hover:text-slate-550 transition-colors"
        aria-label="Go to first page"
      >
        <FiChevronsLeft className="w-4 h-4" />
      </button>

      {/* Previous Page */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 rounded-lg disabled:opacity-20 disabled:hover:text-slate-550 transition-colors"
        aria-label="Go to previous page"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {/* Numeric pages */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`px-3.5 py-2 rounded-lg transition-colors border ${
            currentPage === p
              ? 'bg-sky-500 text-slate-950 border-sky-500'
              : 'bg-slate-900 border-slate-800 hover:text-white hover:border-slate-700'
          }`}
          aria-label={`Go to page ${p}`}
          aria-current={currentPage === p ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {/* Next Page */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 rounded-lg disabled:opacity-20 disabled:hover:text-slate-550 transition-colors"
        aria-label="Go to next page"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>

      {/* Last Page */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className="p-2 bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-200 rounded-lg disabled:opacity-20 disabled:hover:text-slate-550 transition-colors"
        aria-label="Go to last page"
      >
        <FiChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
