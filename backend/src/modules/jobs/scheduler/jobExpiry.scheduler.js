import jobMongoRepository from '../repositories/job.mongo.repository.js';
import jobEvents from '../events/job.events.js';

/**
 * Executes a database scan to locate open jobs past their application deadlines.
 * Transitions matched listings to EXPIRED.
 */
export const runExpiryCheck = async () => {
  try {
    const expiredJobs = await jobMongoRepository.findExpiredJobs();
    if (expiredJobs.length > 0) {
      console.log(`[SCHEDULER] Located ${expiredJobs.length} expired job postings. Upgrading states...`);
      const expiredIds = expiredJobs.map(job => job._id);
      
      await jobMongoRepository.bulkExpireJobs(expiredIds);
      
      expiredIds.forEach(id => {
        jobEvents.emitJobExpired(id);
      });
      
      console.log('[SCHEDULER] Completed bulk auto-expiry transitions.');
    }
  } catch (error) {
    console.error('[SCHEDULER] Error during auto-expiry check routine:', error);
  }
};

/**
 * Initializes interval loops to run the auto-expiry check.
 */
export const startExpiryScheduler = () => {
  // Execute initial scan on server boot
  runExpiryCheck();
  
  // Run check every 12 hours
  const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
  const intervalId = setInterval(runExpiryCheck, TWELVE_HOURS_MS);
  
  // Unref to allow process exit if running tests
  if (intervalId && typeof intervalId.unref === 'function') {
    intervalId.unref();
  }
  
  console.log('[SCHEDULER] Job auto-expiry loop initialized (Runs every 12 hours)');
};
