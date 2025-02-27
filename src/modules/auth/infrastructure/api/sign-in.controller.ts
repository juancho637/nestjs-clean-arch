import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RequestId } from '@common/helpers/infrastructure';
import { authErrorsCodes, AuthUseCasesEnum } from '../../domain';
import { SignInUseCase } from '../../application';
import { SignInDto } from '../dto';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';

@Controller()
export class SignInController {
  private readonly context = SignInController.name;
  constructor(
    @Inject(AuthUseCasesEnum.SIGN_IN_USE_CASE)
    private readonly signInUseCase: SignInUseCase,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('api/auth/sign-in')
  async run(@RequestId() requestId: string, @Body() signInDto: SignInDto) {
    try {
      return await this.signInUseCase.run(signInDto, requestId);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: authErrorsCodes.AM011,
        context: this.context,
        error,
      });
    }
  }
}
