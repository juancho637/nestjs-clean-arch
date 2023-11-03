import { Injectable, Logger } from '@nestjs/common';
import { LoggerInterface, LoggerType } from '../domain';

@Injectable()
export class LoggerService extends Logger implements LoggerInterface {
  debug({ message, context }: LoggerType) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(message, context);
    }
  }

  log({ message, context }: LoggerType) {
    super.log(message, context);
  }

  error({ message, trace, context }: LoggerType) {
    super.error(message, trace, context);
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
