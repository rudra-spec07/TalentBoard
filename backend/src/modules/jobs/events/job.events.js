/**
 * Job module event dispatcher.
 * Prepares notification, logging, and AI match feeds for future phase consumption.
 */
class JobEvents {
  emitJobCreated(job) {
    console.log(`[EVENT] JobCreated: Job ID ${job._id || job.id} has been created in draft/publish.`);
  }

  emitJobPublished(job) {
    console.log(`[EVENT] JobPublished: Job ID ${job._id || job.id} is now OPEN for applications.`);
  }

  emitJobUpdated(job) {
    console.log(`[EVENT] JobUpdated: Job ID ${job._id || job.id} details updated.`);
  }

  emitJobClosed(job) {
    console.log(`[EVENT] JobClosed: Job ID ${job._id || job.id} is now CLOSED.`);
  }

  emitJobExpired(jobId) {
    console.log(`[EVENT] JobExpired: Job ID ${jobId} has reached deadline and is EXPIRED.`);
  }

  emitJobDeleted(jobId, deletedBy) {
    console.log(`[EVENT] JobDeleted: Job ID ${jobId} has been soft-deleted by user ${deletedBy}.`);
  }
}

export default new JobEvents();
