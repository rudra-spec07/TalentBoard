export class JobQueryBuilder {
  constructor() {
    // Basic business constraints: active, not deleted, not expired
    this.filters = {
      isDeleted: false,
      status: 'open',
      applicationDeadline: { $gt: new Date() }
    };
  }

  setKeyword(keyword) {
    if (keyword && keyword.trim()) {
      // Use text search for full-text capabilities since there is a text index
      this.filters.$text = { $search: keyword.trim() };
    }
    return this;
  }

  setLocation(location) {
    if (location && location.trim()) {
      // Case-insensitive substring match
      const escaped = location.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      this.filters.location = { $regex: escaped, $options: 'i' };
    }
    return this;
  }

  setSkills(skills) {
    if (skills) {
      const skillsArray = typeof skills === 'string'
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : skills;
      
      if (skillsArray.length > 0) {
        // Find jobs that require any of the search skills (case-insensitive array check)
        const regexArray = skillsArray.map(s => new RegExp(`^${s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i'));
        this.filters.skillsRequired = { $in: regexArray };
      }
    }
    return this;
  }

  setSalaryRange(min, max) {
    // If user asks for min salary, the job's max salary must be at least that min.
    if (min !== undefined && min !== null) {
      this.filters.salaryMax = { $gte: Number(min) };
    }
    // If user asks for max salary limit, the job's min salary must be at most that max.
    if (max !== undefined && max !== null) {
      this.filters.salaryMin = { $lte: Number(max) };
    }
    return this;
  }

  setExperience(level) {
    if (level) {
      this.filters.experienceLevel = level;
    }
    return this;
  }

  setJobType(type) {
    if (type) {
      this.filters.jobType = type;
    }
    return this;
  }

  build() {
    return this.filters;
  }
}

export default JobQueryBuilder;
