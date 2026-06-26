/**
 * Abstract class defining the Job repository interface.
 * Implements architectural separation of concerns.
 */
class IJobRepository {
  async create(jobData) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmployer(employerId, options) {
    throw new Error('Method not implemented');
  }

  async findPublicJobs(filters, options) {
    throw new Error('Method not implemented');
  }

  async update(id, updateData) {
    throw new Error('Method not implemented');
  }

  async softDelete(id, deletedBy) {
    throw new Error('Method not implemented');
  }

  async incrementViews(id) {
    throw new Error('Method not implemented');
  }

  async incrementApplications(id) {
    throw new Error('Method not implemented');
  }

  async findExpiredJobs(date) {
    throw new Error('Method not implemented');
  }

  async bulkExpireJobs(jobIds) {
    throw new Error('Method not implemented');
  }

  async exists(id) {
    throw new Error('Method not implemented');
  }
}

export default IJobRepository;
