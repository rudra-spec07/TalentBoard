const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

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

// Route mounting
const authRoutes = require('./modules/auth/routes/auth.routes');
app.use('/api/auth', authRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      status: statusCode,
      details: err.details || null
    }
  });
});

module.exports = app;
