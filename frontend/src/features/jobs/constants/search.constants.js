export const SEARCH_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  SORT_BY: 'createdAt',
  SORT_ORDER: 'desc'
};

export const SORT_OPTIONS = [
  { label: 'Newest Postings', value: 'createdAt-desc' },
  { label: 'Oldest Postings', value: 'createdAt-asc' },
  { label: 'Salary: High to Low', value: 'salary-desc' },
  { label: 'Salary: Low to High', value: 'salary-asc' },
  { label: 'Alphabetical Title', value: 'title-asc' }
];
