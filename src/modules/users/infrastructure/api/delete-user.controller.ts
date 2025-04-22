import {
  Controller,
  Delete,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  LoggerServiceInterface,
  LoggerProvidersEnum,
} from '@common/adapters/logger/domain';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import { Auth } from '@modules/auth/infrastructure';
import {
  UserPermissionsEnum,
  UserProvidersEnum,
  userErrorsCodes,
} from '../../domain';
import { DeleteUserUseCase } from '../../application';
import { UserPresenter } from '../user.presenter';

@Controller()
export class DeleteUserController {
  private readonly context = DeleteUserController.name;

  constructor(
    @Inject(UserProvidersEnum.DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Delete('api/users/:id')
  // @Auth<UserPermissionsEnum>(UserPermissionsEnum.DELETE_ANY_USER)
  async run(@Param('id', ParseIntPipe) id: number): Promise<UserPresenter> {
    try {
      const user = await this.deleteUserUseCase.run(id);

      return new UserPresenter(user);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM052,
        context: this.context,
        error,
      });
    }
  }
}
