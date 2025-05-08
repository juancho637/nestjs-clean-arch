import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RequestId } from '@common/helpers/infrastructure';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ResetPasswordUseCase } from '../../application/reset-password.use-case';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';

@Controller('api/auth')
export class ResetPasswordController {
  private readonly context = ResetPasswordController.name;

  constructor(
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('reset-password')
  async run(
    @RequestId() requestId: string,
    @Body() dto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    try {
      await this.resetPasswordUseCase.run(dto, requestId);
      return { message: 'Password successfully updated' };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: { codeError: 'RESET_02', message: 'Error resetting password' },
        context: this.context,
        error,
      });
    }
  }
}
