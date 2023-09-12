import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { FindByUserUseCase } from '../../application';
import { UserUseCasesEnum } from '../../domain';
import { UserPresenter } from '../user.presenter';

@Controller()
export class FindByUserController {
  constructor(
    @Inject(UserUseCasesEnum.FIND_ONE_USER_USECASE)
    private readonly findByUserUseCase: FindByUserUseCase,
  ) {}

  @Get('api/users/:id')
  async run(@Param('id', ParseIntPipe) id: number): Promise<UserPresenter> {
    const user = await this.findByUserUseCase.run(id);

    return new UserPresenter(user);
  }
}
