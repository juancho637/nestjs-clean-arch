import { LoggerType, LoggerErrorType } from './types';

export interface LoggerInterface {
  debug(loggerDebug: LoggerType): void;
  log(loggerLog: LoggerType): void;
  error(loggerError: LoggerErrorType): void;
  warn(loggerWarn: LoggerType): void;
  verbose(loggerVerbose: LoggerType): void;
}
