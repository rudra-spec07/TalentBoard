import { APPLICATION_STATUS } from '../constants/application.constants';

/**
 * Returns consistent Tailwind CSS classes for badges based on candidate statuses
 * @param {string} status - Candidate application status
 * @returns {object} - Object containing bg, text, and border styling strings
 */
export const getStatusColors = (status) => {
  switch (status) {
    case APPLICATION_STATUS.APPLIED:
      return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
    case APPLICATION_STATUS.UNDER_REVIEW:
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' };
    case APPLICATION_STATUS.SHORTLISTED:
      return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' };
    case APPLICATION_STATUS.INTERVIEW_SCHEDULED:
      return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' };
    case APPLICATION_STATUS.SELECTED:
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' };
    case APPLICATION_STATUS.REJECTED:
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' };
  }
};

/**
 * Returns human readable labels for status codes
 * @param {string} status - Application status code
 * @returns {string} - User-friendly status label
 */
export const getStatusLabel = (status) => {
  switch (status) {
    case APPLICATION_STATUS.APPLIED: return 'Applied';
    case APPLICATION_STATUS.UNDER_REVIEW: return 'Under Review';
    case APPLICATION_STATUS.SHORTLISTED: return 'Shortlisted';
    case APPLICATION_STATUS.INTERVIEW_SCHEDULED: return 'Interview Scheduled';
    case APPLICATION_STATUS.SELECTED: return 'Selected';
    case APPLICATION_STATUS.REJECTED: return 'Rejected';
    default: return status || 'Unknown';
  }
};
