import multer from 'multer';
import { BadRequestError } from '../utils/errors.js';

// Setup memory storage
const storage = multer.memoryStorage();

// Validate file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only PDF files are allowed'), false);
  }
};

// Configure Multer limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
}).single('resume');

/**
 * Express middleware wrapper for Multer file uploads.
 * Catches Multer validation limits errors and forwards them as BadRequestError.
 */
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new BadRequestError('File size exceeds the 5 MB limit'));
        }
        return next(new BadRequestError(`Upload error: ${err.message}`));
      }
      return next(err);
    }
    
    // Check if file is provided in request
    if (!req.file) {
      return next(new BadRequestError('No file was uploaded'));
    }
    
    next();
  });
};

export default uploadMiddleware;
