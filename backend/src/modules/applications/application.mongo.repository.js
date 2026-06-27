import Application from './application.model.js';
import { IApplicationRepository } from './application.repository.js';

class MongoApplicationRepository extends IApplicationRepository {
  async create(payload) {
    const doc = await Application.create(payload);
    // Hydrate the fields (populate job information)
    return await this.findById(doc._id);
  }

  async findById(id) {
    return await Application.findById(id)
      .populate('jobId', 'title companyName')
      .populate('applicantId', 'firstName lastName email');
  }

  async exists(applicantId, jobId) {
    const doc = await Application.findOne({ 
      applicantId, 
      jobId, 
      withdrawn: false 
    }).select('_id');
    return !!doc;
  }

  async softWithdraw(id) {
    return await Application.findByIdAndUpdate(
      id,
      { $set: { withdrawn: true, withdrawnAt: new Date() } },
      { new: true }
    ).populate('jobId', 'title companyName');
  }

  async findByApplicant(applicantId, { skip = 0, limit = 10, status } = {}) {
    const filter = { applicantId, withdrawn: false };
    if (status) filter.status = status;

    const items = await Application.find(filter)
      .populate('jobId', 'title companyName')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(filter);
    return { items, total };
  }

  async findByEmployer(employerId, { skip = 0, limit = 10, status } = {}) {
    const filter = { employerId, withdrawn: false };
    if (status) filter.status = status;

    const items = await Application.find(filter)
      .populate('jobId', 'title companyName')
      .populate('applicantId', 'firstName lastName email')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(filter);
    return { items, total };
  }

  async findByJob(jobId, { skip = 0, limit = 10, status } = {}) {
    const filter = { jobId, withdrawn: false };
    if (status) filter.status = status;

    const items = await Application.find(filter)
      .populate('jobId', 'title companyName')
      .populate('applicantId', 'firstName lastName email')
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(filter);
    return { items, total };
  }

  async update(id, updateData) {
    return await Application.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('jobId', 'title companyName')
      .populate('applicantId', 'firstName lastName email');
  }

  async count(filters = {}) {
    return await Application.countDocuments(filters);
  }
}

export default new MongoApplicationRepository();
