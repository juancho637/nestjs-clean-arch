export type PaginatedResourceType<T> = {
  items: T[];
  total: number;
  current_page: number;
  last_page: number;
  size: number;
};
