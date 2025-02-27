export type ResponseType<T> = {
  // isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T;
};
