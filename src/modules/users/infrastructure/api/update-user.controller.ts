import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Put,
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
import { UpdateUserUseCase } from '../../application';
import { UpdateUserDto } from '../dto';
import { UserPresenter } from '../user.presenter';

@Controller()
export class UpdateUserController {
  private readonly context = UpdateUserController.name;

  constructor(
    @Inject(UserProvidersEnum.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Put('api/users/:id')
  // @Auth<UserPermissionsEnum>(UserPermissionsEnum.UPDATE_ANY_USER)
  async run(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserPresenter> {
    try {
      const user = await this.updateUserUseCase.run(id, updateUserDto);

      return new UserPresenter(user);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM042,
        context: this.context,
        error,
      });
    }
  }
}
