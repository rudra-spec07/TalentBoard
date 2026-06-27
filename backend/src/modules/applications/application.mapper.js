import { 
  toApplicationDTO, 
  toApplicationDetailDTO, 
  toEmployerApplicationDTO 
} from './application.dto.js';

export class ApplicationMapper {
  static toDTO(doc) {
    return toApplicationDTO(doc);
  }

  static toDetailDTO(doc) {
    return toApplicationDetailDTO(doc);
  }

  static toEmployerDTO(doc) {
    return toEmployerApplicationDTO(doc);
  }

  static toPaginatedDTOList(items, totalCount, page, limit, mapperFn) {
    const totalPages = Math.ceil(totalCount / limit);
    return {
      items: items.map(item => mapperFn(item)),
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }
}
