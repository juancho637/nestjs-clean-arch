import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application';
import { AuthUseCasesEnum } from '../../domain';
import { LoginDto } from '../dto';

@Controller()
export class LoginController {
  constructor(
    @Inject(AuthUseCasesEnum.LOGIN_USECASE)
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('api/auth/login')
  async run(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.run(loginDto);
  }
}
