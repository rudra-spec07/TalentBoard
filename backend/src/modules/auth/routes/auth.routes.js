const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const validate = require('../../../middlewares/validate.middleware');
const authMiddleware = require('../../../middlewares/auth.middleware');
const { registerSchema, loginSchema } = require('../validation/auth.validation');

// Public route: User Registration
router.post('/register', validate(registerSchema), authController.register);

// Public route: User Login
router.post('/login', validate(loginSchema), authController.login);

// Protected route: Fetch Current User Profile
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
