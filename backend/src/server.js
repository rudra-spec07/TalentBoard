import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { startExpiryScheduler } from './modules/jobs/index.js';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB().then(() => {
  // Start background auto-expiry cron loop
  startExpiryScheduler();

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((err) => {
  console.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
