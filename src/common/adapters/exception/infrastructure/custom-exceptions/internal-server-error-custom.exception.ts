import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base-custom.exception';
import { InternalErrorMessageInterface } from '../../domain';

export class InternalServerErrorCustomException extends BaseCustomException {
  constructor(
    context: string,
    message: InternalErrorMessageInterface,
    stack: string,
  ) {
    super(context, message, HttpStatus.INTERNAL_SERVER_ERROR, stack);
  }
}
