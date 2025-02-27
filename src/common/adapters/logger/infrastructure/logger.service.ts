import { Injectable, Logger } from '@nestjs/common';
import { LoggerServiceInterface, LoggerType } from '../domain';

@Injectable()
export class LoggerService extends Logger implements LoggerServiceInterface {
  debug({ message, context }: LoggerType) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(message, context);
    }
  }

  log({ message, context, requestId }: LoggerType) {
    message = typeof message === 'string' ? { message } : message;

    const log = JSON.stringify({
      context,
      requestId,
      ...message,
    });

    super.log(log, context);
  }

  error({ message, context }: LoggerType) {
    super.error(message, undefined, context);
  }

  warn({ message, context }: LoggerType) {
    super.warn(message, context);
  }

  verbose({ message, context }: LoggerType) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(message, context);
    }
  }
}
