export type PropValuesType<T> = {
  [K in keyof T]: T[K];
};
