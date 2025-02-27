import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';
import { InternalErrorMessageInterface } from '../../domain';

export class UnauthorizedCustomException extends BaseCustomException {
  constructor(context: string, message: InternalErrorMessageInterface) {
    super(context, message, HttpStatus.UNAUTHORIZED);
  }
}
