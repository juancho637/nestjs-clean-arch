import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LoggerService } from '@ecommerce/common/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly loggerContext = LoggingInterceptor.name;

  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const ip = this.getIP(request);

    this.logger.log({
      message: `Incoming Request on ${request.path} method=${request.method} ip=${ip}`,
      context: this.loggerContext,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          message: `End Request for ${request.path} method=${
            request.method
          } ip=${ip} duration=${Date.now() - now}ms`,
          context: this.loggerContext,
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
