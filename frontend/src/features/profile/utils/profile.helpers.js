/**
 * Splits and normalizes skill strings from input arrays.
 * Removes duplicates (case-insensitive), trims whitespace, ignores empty values, limits to 20.
 * @param {Array<string>} skills 
 * @returns {Array<string>} Normalized skills
 */
export const normalizeSkills = (skills) => {
  if (!Array.isArray(skills)) return [];

  const normalized = [];
  const seen = new Set();

  for (const skill of skills) {
    if (typeof skill !== 'string') continue;
    const trimmed = skill.trim();
    if (trimmed === '') continue;

    const lowercased = trimmed.toLowerCase();
    if (!seen.has(lowercased)) {
      seen.add(lowercased);
      normalized.push(trimmed);
    }

    if (normalized.length >= 20) {
      break;
    }
  }

  return normalized;
};

/**
 * Returns formatted user full name.
 * @param {Object} profile 
 * @returns {string} Combined First and Last name
 */
export const getFullName = (profile) => {
  if (!profile) return '';
  return `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
};
