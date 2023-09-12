import {
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserUseCasesEnum } from '../../domain';
import { DeleteUserUseCase } from '../../application';
import { UserPresenter } from '../user.presenter';

@Controller()
export class DeleteUserController {
  constructor(
    @Inject(UserUseCasesEnum.DELETE_USER_USECASE)
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Delete('api/users/:id')
  async run(@Param('id', ParseIntPipe) id: number): Promise<UserPresenter> {
    const user = await this.deleteUserUseCase.run(id);

    return new UserPresenter(user);
  }
}
