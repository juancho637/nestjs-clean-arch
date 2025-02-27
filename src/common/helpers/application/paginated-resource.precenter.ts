import { PaginatedResourceType } from '../domain';

export class PaginatedResourcePresenter<T> {
  items: T[];
  total: number;
  current_page: number;
  last_page: number;
  size: number;

  constructor(paginatedResource: PaginatedResourceType<T>) {
    this.items = paginatedResource.items;
    this.total = paginatedResource.total;
    this.current_page = paginatedResource.currentPage;
    this.last_page = paginatedResource.lastPage;
    this.size = paginatedResource.size;
  }
}
