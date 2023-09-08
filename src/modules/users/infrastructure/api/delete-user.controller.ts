import {
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserUseCasesEnum } from '../../domain';
import { DeleteUserUseCase } from '../../application';

@Controller()
export class DeleteUserController {
  constructor(
    @Inject(UserUseCasesEnum.DELETE_USER_USECASE)
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Delete('api/users/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserUseCase.run(id);
  }
}
