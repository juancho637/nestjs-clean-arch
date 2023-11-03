import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '@ecommerce/common/logger';
import { ErrorInterface } from '../../domain';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Catch()
export class AllExceptionFilter implements ExceptionFilter, GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as ErrorInterface)
        : { message: (exception as Error).message, code_error: null };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request ? request.url : info.parentType,
      },
      ...message,
    };

    if (host.getType() === 'http') {
      this.logMessage(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
        status,
        exception,
      );

      response.status(status).json(responseData);
    } else {
      this.logMessage(
        `End Request for ${info.fieldName}`,
        `method=${info.parentType}`,
        status,
        exception,
      );

      return exception;
    }
  }

  private logMessage(
    context: string,
    message: string,
    status: number,
    exception: Error,
  ) {
    if (status === 500) {
      this.logger.error({
        context,
        message,
        trace: status >= 500 ? exception.stack : '',
      });
    } else {
      this.logger.warn({
        context,
        message,
      });
    }
  }
}
