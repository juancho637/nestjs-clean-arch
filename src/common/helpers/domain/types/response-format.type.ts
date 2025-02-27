import { ResponseType } from './response.type';

export class ResponseFormatType<T> implements ResponseType<T> {
  // isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T;
}
