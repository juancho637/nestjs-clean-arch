import { HttpException } from '@nestjs/common';
import { InternalErrorMessageInterface } from '../../domain';

export class BaseCustomException extends HttpException {
  context: string;
  stackString: string;

  constructor(
    context: string,
    message: InternalErrorMessageInterface,
    status: number,
    stackString?: string,
  ) {
    super(message, status);
    this.context = context;
    this.stackString = stackString;
  }
}
