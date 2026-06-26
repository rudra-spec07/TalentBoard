/**
 * Shapes the user database entity into a clean public profile representation.
 * @param {Object} user Mongoose user document
 * @returns {Object} Public UserProfileDTO
 */
export const toUserProfileDTO = (user) => {
  if (!user) return null;

  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar || '',
    headline: user.headline || '',
    bio: user.bio || '',
    phoneNumber: user.phoneNumber || '',
    city: user.city || '',
    country: user.country || '',
    skills: user.skills || [],
    resumeUrl: user.resumeUrl || '',
    githubUrl: user.githubUrl || '',
    linkedinUrl: user.linkedinUrl || '',
    portfolioUrl: user.portfolioUrl || '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};
