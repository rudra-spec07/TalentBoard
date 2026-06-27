import { ALLOWED_STATUS_TRANSITIONS } from '../constants/application.constants';

/**
 * Checks whether status transition is valid according to pipeline rules
 * @param {string} currentStatus - Active state
 * @param {string} targetStatus - Requested destination state
 * @returns {boolean} - True if allowed, false otherwise
 */
export const canTransitionStatus = (currentStatus, targetStatus) => {
  if (!currentStatus || !targetStatus) return false;
  
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(targetStatus);
};

/**
 * Returns list of allowed target statuses from a current status
 * @param {string} currentStatus - Active state code
 * @returns {string[]} - Array of allowed transition codes
 */
export const getAvailableTransitions = (currentStatus) => {
  return ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
};
