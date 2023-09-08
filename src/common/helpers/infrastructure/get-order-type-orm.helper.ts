import { SortingType } from '../domain';

export const getOrderTypeOrmHelper = (sort: SortingType) =>
  sort ? { [sort.property]: sort.direction } : {};
