const User = require('../models/user.model');

class UserRepository {
  /**
   * Create a new user in the database
   * @param {Object} userData 
   * @returns {Promise<Object>} The created user document
   */
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Find a user by their email address
   * @param {string} email 
   * @returns {Promise<Object|null>} The user document or null
   */
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  /**
   * Find a user by their unique database ID
   * @param {string} id 
   * @returns {Promise<Object|null>} The user document or null
   */
  async findById(id) {
    return await User.findById(id);
  }

  /**
   * Update user details by ID
   * @param {string} id 
   * @param {Object} updateData 
   * @returns {Promise<Object|null>} The updated user document
   */
  async update(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete a user by ID
   * @param {string} id 
   * @returns {Promise<Object|null>} The deleted user document
   */
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
