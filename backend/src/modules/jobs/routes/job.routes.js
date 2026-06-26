import express from 'express';
import jwt from 'jsonwebtoken';
import jobController from '../controllers/job.controller.js';
import validate from '../../../middlewares/validate.middleware.js';
import authenticate from '../../../middlewares/auth.middleware.js';
import authorize from '../../../middlewares/role.middleware.js';
import verifyJobOwnership from '../middleware/ownership.middleware.js';
import { 
  createJobSchema, 
  updateJobSchema, 
  reopenJobSchema 
} from '../validators/job.validation.js';

const router = express.Router();

// Optional authentication parser for public endpoints
const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'talentboardx_super_secret_jwt_key_2026';
    try {
      const decoded = jwt.verify(token, secret);
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (err) {
      // Ignore token validation issues for optional guest feeds
    }
  }
  next();
};

// Employer specific dashboard endpoints (registered before /:id to prevent clashes)
router.get('/my', authenticate, authorize('employer', 'admin'), jobController.getEmployerJobs);

// Admin moderation feeds (registered before /:id to prevent clashes)
router.get('/admin', authenticate, authorize('admin'), jobController.adminGetJobs);
router.delete('/admin/:id', authenticate, authorize('admin'), jobController.adminDeleteJob);

// Public listings search and detailed view
router.get('/', optionalAuthenticate, jobController.getJobs);
router.get('/:id', optionalAuthenticate, jobController.getJob);

// Core lifecycle mutations
router.post('/', authenticate, authorize('employer', 'admin'), validate(createJobSchema), jobController.createJob);
router.put('/:id', authenticate, authorize('employer', 'admin'), verifyJobOwnership, validate(updateJobSchema), jobController.updateJob);
router.put('/:id/publish', authenticate, authorize('employer', 'admin'), verifyJobOwnership, jobController.publishJob);
router.put('/:id/close', authenticate, authorize('employer', 'admin'), verifyJobOwnership, jobController.closeJob);
router.put('/:id/reopen', authenticate, authorize('employer', 'admin'), verifyJobOwnership, validate(reopenJobSchema), jobController.reopenJob);
router.delete('/:id', authenticate, authorize('employer', 'admin'), verifyJobOwnership, jobController.deleteJob);

export default router;
