import userRepository from './user.repository.js';
import { toUserProfileDTO } from './user.dto.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';
import { uploadBuffer } from '../../utils/cloudinary.js';

class UserService {
  /**
   * Helper to validate user existence and active status
   * @param {string} userId 
   * @returns {Promise<Object>} Mongoose user document
   */
  async _getActiveUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    if (user.isActive === false) {
      throw new ForbiddenError('Inactive account');
    }
    return user;
  }

  /**
   * Retrieve public user profile DTO
   * @param {string} userId 
   * @returns {Promise<Object>} UserProfileDTO
   */
  async getProfile(userId) {
    const user = await this._getActiveUser(userId);
    return toUserProfileDTO(user);
  }

  /**
   * Update user profile details
   * @param {string} userId 
   * @param {Object} updateData 
   * @returns {Promise<Object>} Updated UserProfileDTO
   */
  async updateProfile(userId, updateData) {
    await this._getActiveUser(userId);

    // Normalize skills if present in updateData
    if (updateData.skills) {
      updateData.skills = this.normalizeSkills(updateData.skills);
    }

    const updatedUser = await userRepository.updateById(userId, updateData);
    return toUserProfileDTO(updatedUser);
  }

  /**
   * Upload resume buffer to Cloudinary and update user profile
   * @param {string} userId 
   * @param {Buffer} fileBuffer 
   * @returns {Promise<Object>} Updated UserProfileDTO
   */
  async uploadResume(userId, fileBuffer) {
    await this._getActiveUser(userId);

    // Upload to Cloudinary
    const secureUrl = await uploadBuffer(fileBuffer);

    // Update in database repository
    const updatedUser = await userRepository.updateResume(userId, secureUrl);
    return toUserProfileDTO(updatedUser);
  }

  /**
   * Soft-deletes user account
   * @param {string} userId 
   * @returns {Promise<Object>} Deactivated UserProfileDTO
   */
  async deleteAccount(userId) {
    await this._getActiveUser(userId);
    
    const deactivatedUser = await userRepository.deactivate(userId);
    return toUserProfileDTO(deactivatedUser);
  }

  /**
   * Normalize skills array: trim, case-insensitive uniqueness, remove empty strings, limit to 20
   * @param {Array<string>} skills 
   * @returns {Array<string>} Normalized skills
   */
  normalizeSkills(skills) {
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
      
      // Limit to 20 skills
      if (normalized.length >= 20) {
        break;
      }
    }

    return normalized;
  }
}

export default new UserService();
