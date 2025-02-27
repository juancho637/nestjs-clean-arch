import { InternalErrorMessageInterface } from './internal-error-message.interface';

export interface FormatExceptionMessageInterface {
  message: InternalErrorMessageInterface;
  context: string;
  error?: Error;
}
