import {
  LoggerDebugType,
  LoggerErrorType,
  LoggerLogType,
  LoggerVerboseType,
  LoggerWarnType,
} from './types';

export interface LoggerInterface {
  debug(loggerDebug: LoggerDebugType): void;
  log(loggerLog: LoggerLogType): void;
  error(loggerError: LoggerErrorType): void;
  warn(loggerWarn: LoggerWarnType): void;
  verbose(loggerVerbose: LoggerVerboseType): void;
}
