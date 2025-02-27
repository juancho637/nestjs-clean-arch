import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';
import { InternalErrorMessageInterface } from '../../domain';

export class BadRequestCustomException extends BaseCustomException {
  constructor(context: string, message: InternalErrorMessageInterface) {
    super(context, message, HttpStatus.BAD_REQUEST);
  }
}
