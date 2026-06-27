export class IApplicationRepository {
  create(payload) { throw new Error('Method not implemented'); }
  findById(id) { throw new Error('Method not implemented'); }
  findByApplicant(applicantId, options) { throw new Error('Method not implemented'); }
  findByEmployer(employerId, options) { throw new Error('Method not implemented'); }
  findByJob(jobId, options) { throw new Error('Method not implemented'); }
  exists(applicantId, jobId) { throw new Error('Method not implemented'); }
  update(id, updateData) { throw new Error('Method not implemented'); }
  softWithdraw(id) { throw new Error('Method not implemented'); }
}
