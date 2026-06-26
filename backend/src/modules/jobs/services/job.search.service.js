import jobMongoRepository from '../repositories/job.mongo.repository.js';
import JobQueryBuilder from '../utils/job.query.builder.js';
import { toSearchJobSummaryDTO } from '../dto/job.dto.js';
import { SEARCH_DEFAULTS } from '../constants/search.constants.js';

class JobSearchService {
  /**
   * Search for jobs matching keyword, location, skills, salary, job type, and experience parameters.
   */
  async searchJobs(params = {}) {
    const filters = this.buildSearchQuery(params);
    
    // Pagination calculations
    const page = params.page || SEARCH_DEFAULTS.PAGE;
    const limit = params.limit || SEARCH_DEFAULTS.LIMIT;
    const { skip, validatedLimit } = this.buildPagination(page, limit);

    // Sorting translation
    const sort = this.buildSortOptions(params.sortBy, params.sortOrder);

    // Run database queries in parallel for efficiency
    const [rawItems, totalItems] = await Promise.all([
      jobMongoRepository.searchJobs(filters, { skip, limit: validatedLimit, sort }),
      jobMongoRepository.countJobs(filters)
    ]);

    // Map to response output DTOs
    const items = this.transformSearchResult(rawItems);
    const totalPages = Math.ceil(totalItems / validatedLimit);

    return {
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit: validatedLimit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  /**
   * Translate search params into MongoDB query filters using the query builder
   */
  buildSearchQuery(params) {
    const builder = new JobQueryBuilder();

    builder
      .setKeyword(params.keyword)
      .setLocation(params.location)
      .setSkills(params.skills)
      .setSalaryRange(params.salaryMin, params.salaryMax)
      .setExperience(params.experienceLevel)
      .setJobType(params.jobType);

    return builder.build();
  }

  /**
   * Safe skip/limit offset calculations
   */
  buildPagination(page, limit) {
    const validatedPage = Math.max(1, parseInt(page, 10) || 1);
    let validatedLimit = parseInt(limit, 10) || SEARCH_DEFAULTS.LIMIT;
    
    // Enforce max page size boundaries to prevent denial-of-service attempts
    if (validatedLimit > SEARCH_DEFAULTS.MAX_LIMIT) {
      validatedLimit = SEARCH_DEFAULTS.MAX_LIMIT;
    }
    
    const skip = (validatedPage - 1) * validatedLimit;

    return { skip, validatedLimit };
  }

  /**
   * Map input string keys into MongoDB sort objects
   */
  buildSortOptions(sortBy = SEARCH_DEFAULTS.SORT_BY, sortOrder = SEARCH_DEFAULTS.SORT_ORDER) {
    const order = sortOrder === 'asc' ? 1 : -1;
    
    switch (sortBy) {
      case 'salary':
        return order === -1 
          ? { salaryMax: -1, salaryMin: -1 } 
          : { salaryMin: 1, salaryMax: 1 };
      case 'title':
        return { title: order };
      case 'companyName':
        return { companyName: order };
      case 'createdAt':
      default:
        return { createdAt: order };
    }
  }

  /**
   * Maps database records to clean Search Summary DTOs
   */
  transformSearchResult(items) {
    return items.map(item => toSearchJobSummaryDTO(item));
  }
}

export default new JobSearchService();
