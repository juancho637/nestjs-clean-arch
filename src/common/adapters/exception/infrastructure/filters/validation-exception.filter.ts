import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '@common/adapters/logger/infrastructure';
import { LoggerProvidersEnum } from '@common/adapters/logger/domain';

@Injectable()
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers['x-request-id'] as string;

    const exceptionResponse = exception.getResponse();
    let messages: string[] = [];

    if (
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message
    ) {
      messages = (exceptionResponse as any).message;
    } else if (Array.isArray(exceptionResponse)) {
      messages = exceptionResponse;
    }

    // Si se trata de errores de validación (array de mensajes), usamos 422
    let status = exception.getStatus();
    if (Array.isArray(messages)) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    // Agrupar errores por propiedad
    const groupedErrors: Record<string, string[]> = {};
    messages.forEach((message) => {
      let property = '';
      // Se asume que el nombre de la propiedad es la primera palabra del mensaje
      const firstWordMatch = message.match(/^(\w+)/);
      if (firstWordMatch) {
        property = firstWordMatch[1];
      }
      // Para mensajes que comienzan con "each", se extrae la propiedad después de "in"
      if (property === 'each') {
        const inMatch = message.match(/in (\w+)/);
        if (inMatch) {
          property = inMatch[1];
        }
      }
      if (!property) {
        property = 'unknown';
      }
      if (!groupedErrors[property]) {
        groupedErrors[property] = [];
      }
      groupedErrors[property].push(message);
    });

    const errorsArray = Object.entries(groupedErrors).map(([prop, errors]) => ({
      property: prop,
      errors,
    }));

    const context = `ValidationException for ${request.path}`;

    const logMessage = {
      context,
      requestId,
      errors: errorsArray,
    };

    this.logger.error({
      context,
      message: JSON.stringify(logMessage),
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: errorsArray,
    });
  }
}
