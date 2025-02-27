import { Body, Controller, Inject, Post } from '@nestjs/common';
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
import { StoreUserUseCase } from '../../application';
import { CreateUserDto } from '../dto';
import { UserPresenter } from '../user.presenter';

@Controller()
export class StoreUserController {
  private readonly context = StoreUserController.name;

  constructor(
    @Inject(UserProvidersEnum.STORE_USER_USE_CASE)
    private readonly storeUserUseCase: StoreUserUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('api/users')
  // @Auth<UserPermissionsEnum>(UserPermissionsEnum.CREATE_ANY_USER)
  async run(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    try {
      const user = await this.storeUserUseCase.run(createUserDto);

      return new UserPresenter(user);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM032,
        context: this.context,
        error,
      });
    }
  }
}
