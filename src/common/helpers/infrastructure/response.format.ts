import { ResponseType } from '../domain/response.type';

export class ResponseFormat<T> implements ResponseType<T> {
  // isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T;
}
