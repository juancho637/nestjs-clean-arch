import { Request, Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '@common/adapters/logger/infrastructure';
import { LoggerProvidersEnum } from '@common/adapters/logger/domain';

@Injectable()
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers['x-request-id'] as string;

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    const context = `Unhandled Exception for ${request.path}`;

    const logMessage = {
      context,
      requestId,
      message,
    };

    this.logger.error({
      context,
      message: JSON.stringify(logMessage),
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
