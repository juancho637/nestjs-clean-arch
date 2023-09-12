import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserUseCasesEnum } from '../../domain';
import { StoreUserUseCase } from '../../application';
import { CreateUserDto } from '../dto';
import { UserPresenter } from '../user.presenter';

@Controller()
export class StoreUserController {
  constructor(
    @Inject(UserUseCasesEnum.STORE_USER_USECASE)
    private readonly storeUserUseCase: StoreUserUseCase,
  ) {}

  @Post('api/users')
  async run(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    const user = await this.storeUserUseCase.run(createUserDto);

    return new UserPresenter(user);
  }
}
