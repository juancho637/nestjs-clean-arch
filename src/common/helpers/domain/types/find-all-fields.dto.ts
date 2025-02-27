import { FilteringType } from './filtering.type';
import { PaginationType } from './pagination.type';
import { SortingType } from './sorting.type';

export type FindAllFieldsDto<T> = {
  pagination?: PaginationType;
  sort?: SortingType<T>;
  filters?: FilteringType<T>[];
  relations?: string[];
};
