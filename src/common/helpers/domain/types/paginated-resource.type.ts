export type PaginatedResourceType<T> = {
  items: T[];
  total: number;
  currentPage: number;
  lastPage: number;
  size: number;
};
