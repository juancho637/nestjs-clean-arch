import { Injectable, Logger } from '@nestjs/common';
import {
  LoggerDebugType,
  LoggerErrorType,
  LoggerInterface,
  LoggerLogType,
  LoggerVerboseType,
  LoggerWarnType,
} from '../domain';

@Injectable()
export class LoggerService extends Logger implements LoggerInterface {
  debug({ context, message }: LoggerDebugType) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  log({ context, message }: LoggerLogType) {
    super.log(`[INFO] ${message}`, context);
  }

  error({ context, message, trace }: LoggerErrorType) {
    super.error(`[ERROR] ${message}`, trace, context);
  }

  warn({ context, message }: LoggerWarnType) {
    super.warn(`[WARN] ${message}`, context);
  }

  verbose({ context, message }: LoggerVerboseType) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
