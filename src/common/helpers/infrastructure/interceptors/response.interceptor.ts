import { Request } from 'express';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseFormatType } from '../../domain';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormatType<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();

    return context.getType() === 'http'
      ? next.handle().pipe(
          map((data) => ({
            data,
            path: request.path,
            duration: `${Date.now() - now}ms`,
            method: request.method,
          })),
        )
      : next.handle();
  }
}
