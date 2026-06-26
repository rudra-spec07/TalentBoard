import User from '../auth/models/user.model.js';

class UserMongoRepository {
  /**
   * Find user profile by unique ID
   * @param {string} id 
   * @returns {Promise<Object|null>} User document
   */
  async findById(id) {
    return await User.findById(id);
  }

  /**
   * Update user profile details by ID
   * @param {string} id 
   * @param {Object} updateData 
   * @returns {Promise<Object|null>} Updated user document
   */
  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  /**
   * Soft deactivates (soft deletes) user account
   * @param {string} id 
   * @returns {Promise<Object|null>} Deactivated user document
   */
  async deactivate(id) {
    return await User.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
  }

  /**
   * Checks if a user document exists by ID
   * @param {string} id 
   * @returns {Promise<boolean>} True if user exists, false otherwise
   */
  async exists(id) {
    const user = await User.findById(id).select('_id');
    return !!user;
  }

  /**
   * Updates user's resume URL
   * @param {string} id 
   * @param {string} resumeUrl 
   * @returns {Promise<Object|null>} Updated user document
   */
  async updateResume(id, resumeUrl) {
    return await User.findByIdAndUpdate(
      id,
      { $set: { resumeUrl } },
      { new: true }
    );
  }
}

export default new UserMongoRepository();
