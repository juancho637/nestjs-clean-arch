import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RequestId } from '@common/helpers/infrastructure';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignUpUseCase } from '../../application/sign-up.use-case';
import { AuthType, AuthUseCasesEnum, authErrorsCodes } from '../../domain';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';

@Controller('api/auth')
export class SignUpController {
  private readonly context = SignUpController.name;

  constructor(
    @Inject(AuthUseCasesEnum.SIGN_UP_USE_CASE)
    private readonly signUpUseCase: SignUpUseCase,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('sign-up')
  async run(
    @RequestId() requestId: string,
    @Body() signUpDto: SignUpDto,
  ): Promise<AuthType> {
    try {
      return await this.signUpUseCase.run(signUpDto, requestId);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: authErrorsCodes.AM011, // Puedes definir un error específico para el sign up
        context: this.context,
        error,
      });
    }
  }
}
