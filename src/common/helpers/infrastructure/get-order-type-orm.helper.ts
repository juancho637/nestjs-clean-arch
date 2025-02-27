import { SortingType } from '../domain';

export const getOrderTypeOrmHelper = <T>(sort: SortingType<T>) =>
  sort ? { [sort.property]: sort.direction } : {};
