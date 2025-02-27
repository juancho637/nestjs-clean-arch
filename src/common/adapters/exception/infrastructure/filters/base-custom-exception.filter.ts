import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseCustomException } from '@common/adapters/exception/infrastructure';
import { LoggerService } from '@common/adapters/logger/infrastructure';
import { ErrorInterface } from '@common/helpers/domain';
import { LoggerProvidersEnum } from '@common/adapters/logger/domain';

@Injectable()
@Catch(BaseCustomException)
export class BaseCustomExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: BaseCustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers['x-request-id'] as string;

    const status = exception.getStatus();
    const message = exception.getResponse() as ErrorInterface;
    const context = exception.context;
    const stack = exception.stackString;

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      codeError: message.codeError,
      message: message.message,
    };

    const logMessage = {
      context,
      requestId,
      ...responseData,
      trace: stack,
    };

    this.logger.error({
      context,
      message: JSON.stringify(logMessage),
    });

    response.status(status).json(responseData);
  }
}
