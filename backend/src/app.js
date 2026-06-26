import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './modules/auth/routes/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import { jobRoutes } from './modules/jobs/index.js';

const app = express();

// Secure application using Helmet
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming request JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('Messmate Backend is up and running! 🚀');
});

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/jobs', jobRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.details || [message];

  // Map Mongoose Validation exceptions
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  } 
  // Map MongoDB Duplicate Key conflicts
  else if (err.code === 11000) {
    statusCode = 409;
    message = 'Conflict: Duplicate resource';
    errors = ['A resource with this key already exists'];
  } 
  // Map Mongoose CastExceptions (e.g. invalid Hex ID format)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field ${err.path}`;
    errors = [message];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
});

export default app;
