import { ALLOWED_STATUS_TRANSITIONS } from './application.constants.js';

/**
 * Validates whether a status transition is permitted under workflow rules.
 * @param {string} currentStatus - The current application state status
 * @param {string} targetStatus - The desired state status to move towards
 * @returns {boolean} - True if allowed, false otherwise
 */
export const canTransitionStatus = (currentStatus, targetStatus) => {
  if (!currentStatus || !targetStatus) return false;
  
  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
  return allowed.includes(targetStatus);
};
