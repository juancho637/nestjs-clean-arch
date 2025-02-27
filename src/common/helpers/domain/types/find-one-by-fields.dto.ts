import { FilteringType } from './filtering.type';

export type FindOneByFieldsDto<T> = {
  filter?: FilteringType<T>;
  relations?: string[];
};
