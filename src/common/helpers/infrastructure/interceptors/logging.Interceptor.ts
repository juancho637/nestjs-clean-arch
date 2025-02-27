import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LoggerService } from '@common/adapters/logger/infrastructure';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly loggerContext = LoggingInterceptor.name;

  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const httpCtx = context.switchToHttp();

    const request = httpCtx.getRequest<Request>();

    const ip = this.getIP(request);
    const requestId = request.headers['x-request-id'] as string;

    this.logger.log({
      context: `Incoming Request on ${request.path}`,
      message: { method: request.method, ip: ip },
      requestId,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          context: `End Request for ${request.path}`,
          requestId,
          message: {
            method: request.method,
            ip: ip,
            duration: `${Date.now() - now}ms`,
          },
        });
      }),
    );
  }

  private getIP(request: Request): string {
    let ip: string;
    const ipAddr = request.headers['X-Forwarded-For'] as string;

    if (ipAddr) {
      const list = ipAddr.split(',');

      ip = list[list.length - 1];
    } else {
      ip = request.socket.remoteAddress;
    }

    return ip.replace('::ffff:', '');
  }
}
