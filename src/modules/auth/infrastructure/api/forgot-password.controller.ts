import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RequestId } from '@common/helpers/infrastructure';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ForgotPasswordUseCase } from '../../application/forgot-password.use-case';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';

@Controller('api/auth')
export class ForgotPasswordController {
  private readonly context = ForgotPasswordController.name;

  constructor(
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('forgot-password')
  async run(@RequestId() requestId: string, @Body() dto: ForgotPasswordDto) {
    try {
      return await this.forgotPasswordUseCase.run(dto, requestId);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: {
          codeError: 'FORGOT_02',
          message: 'Error processing forgot password request',
        },
        context: this.context,
        error,
      });
    }
  }
}
