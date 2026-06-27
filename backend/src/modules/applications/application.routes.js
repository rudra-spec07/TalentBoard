import express from 'express';
import controller from './application.controller.js';
import authenticate from '../../middlewares/auth.middleware.js';
import authorize from '../../middlewares/role.middleware.js';
import validate from '../../middlewares/validate.middleware.js';
import { 
  applyJobSchema, 
  updateStatusSchema, 
  queryApplicationsSchema 
} from './application.validation.js';

const router = express.Router();

// Seeker-specific endpoints
router.post('/', authenticate, authorize('job_seeker'), validate(applyJobSchema), controller.applyJob);
router.get('/me', authenticate, authorize('job_seeker'), validate(queryApplicationsSchema), controller.getMyApplications);
router.delete('/:id', authenticate, authorize('job_seeker'), controller.withdrawApplication);

// Shared/Employer specific endpoints
router.get('/:id', authenticate, controller.getApplication);
router.get('/job/:jobId', authenticate, authorize('employer', 'admin'), validate(queryApplicationsSchema), controller.getApplicantsForJob);
router.patch('/:id/status', authenticate, authorize('employer', 'admin'), validate(updateStatusSchema), controller.updateStatus);

export default router;
