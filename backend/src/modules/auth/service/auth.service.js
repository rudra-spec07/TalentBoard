import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repository/user.repository.js';
import { ConflictError, UnauthorizedError } from '../../../utils/errors.js';

class AuthService {
  /**
   * Registers a new user
   * @param {Object} userData 
   * @returns {Promise<Object>} User details (excluding password)
   */
  async register(userData) {
    const { firstName, lastName, email, password, role } = userData;

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
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'job_seeker',
      isActive: true,
      isVerified: false
    });

    // Format response
    return {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
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
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.isActive === false) {
      throw new UnauthorizedError('Your account has been deactivated.');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = this.generateToken(user);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive
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

export default new AuthService();
