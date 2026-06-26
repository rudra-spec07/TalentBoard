import express from 'express';
import authController from '../controller/auth.controller.js';
import validate from '../../../middlewares/validate.middleware.js';
import authMiddleware from '../../../middlewares/auth.middleware.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';

const router = express.Router();

// Public route: User Registration
router.post('/register', validate(registerSchema), authController.register);

// Public route: User Login
router.post('/login', validate(loginSchema), authController.login);

// Protected route: Fetch Current User Profile
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;
