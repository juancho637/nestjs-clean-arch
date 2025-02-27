export type SortingType<T> = {
  property: keyof T;
  direction: 'asc' | 'desc';
};
