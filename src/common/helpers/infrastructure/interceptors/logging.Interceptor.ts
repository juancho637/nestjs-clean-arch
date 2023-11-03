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
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly loggerContext = LoggingInterceptor.name;

  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const httpCtx = context.switchToHttp();

    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo<GraphQLResolveInfo>();

    const request = httpCtx.getRequest<Request>() || gqlCtx.getContext().req;

    const ip = this.getIP(request);

    this.logger.log({
      context: `Incoming Request on ${
        context.getType() === 'http' ? request.path : info.fieldName
      }`,
      message: `method=${
        context.getType() === 'http' ? request.method : info.parentType
      } ip=${ip}`,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          context: `End Request for ${
            context.getType() === 'http' ? request.path : info.fieldName
          }`,
          message: `method=${
            context.getType() === 'http' ? request.method : info.parentType
          } ip=${ip} duration=${Date.now() - now}ms`,
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
