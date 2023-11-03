import { FormatExceptionMessageInterface } from './format-exception-message.interface';

export interface ExceptionInterface {
  badRequestException(data: FormatExceptionMessageInterface): void;
  internalServerErrorException(data?: FormatExceptionMessageInterface): void;
  forbiddenException(data?: FormatExceptionMessageInterface): void;
  UnauthorizedException(data?: FormatExceptionMessageInterface): void;
}
