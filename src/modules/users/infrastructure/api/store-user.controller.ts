import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserUseCasesEnum } from '../../domain';
import { StoreUserUseCase } from '../../application';
import { CreateUserDto } from '../dto';

@Controller()
export class StoreUserController {
  constructor(
    @Inject(UserUseCasesEnum.STORE_USER_USECASE)
    private readonly storeUserUseCase: StoreUserUseCase,
  ) {}

  @Post('api/users')
  async run(@Body() createUserDto: CreateUserDto) {
    return await this.storeUserUseCase.run(createUserDto);
  }
}
