const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/user.repository');
const { ConflictError, UnauthorizedError } = require('../../../utils/errors');

class AuthService {
  /**
   * Registers a new user
   * @param {Object} userData 
   * @returns {Promise<Object>} User details (excluding password)
   */
  async register(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('A user with this email address already exists');
    }

    // Hash password with 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'job_seeker'
    });

    // Format response DTO
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      createdAt: newUser.createdAt
    };
  }

  /**
   * Log in user and generate JWT token
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} { user: Object, token: string }
   */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('No user found with this email. Please sign up first.');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Your account is currently suspended. Please contact support.');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Wrong password. Please try again.');
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token
    };
  }

  /**
   * Helper to generate JWT Token
   * @param {Object} user 
   * @returns {string} Signed JWT token
   */
  generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'talentboardx_super_secret_jwt_key_2026';
    
    return jwt.sign(payload, secret, {
      expiresIn: '24h'
    });
  }
}

module.exports = new AuthService();
