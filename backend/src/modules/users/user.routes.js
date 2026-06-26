import express from 'express';
import userController from './user.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import authenticate from '../../middlewares/auth.middleware.js';
import uploadMiddleware from '../../middlewares/upload.middleware.js';
import { updateProfileSchema } from './user.validation.js';

const router = express.Router();

// Get current user profile
router.get('/me', authenticate, userController.getProfile);

// Update user profile details
router.put('/me', authenticate, validate(updateProfileSchema), userController.updateProfile);

// Upload resume raw PDF file (Multer memory upload limits apply)
router.post('/resume', authenticate, uploadMiddleware, userController.uploadResume);

// Soft-deactivate user profile
router.delete('/me', authenticate, userController.deleteAccount);

export default router;
