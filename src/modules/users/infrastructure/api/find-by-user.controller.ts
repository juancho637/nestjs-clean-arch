import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
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
import { FindByUserUseCase } from '../../application';
import { UserPresenter } from '../user.presenter';
import { FilterRuleEnum } from '@common/helpers/domain';

@Controller()
export class FindByUserController {
  private readonly context = FindByUserController.name;

  constructor(
    @Inject(UserProvidersEnum.FIND_BY_USER_USE_CASE)
    private readonly findByUserUseCase: FindByUserUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/users/:id')
  // @Auth<UserPermissionsEnum>(UserPermissionsEnum.READ_ANY_USER)
  async run(@Param('id', ParseIntPipe) id: number): Promise<UserPresenter> {
    try {
      const user = await this.findByUserUseCase.run({
        filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
      });

      return new UserPresenter(user);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM012,
        context: this.context,
        error,
      });
    }
  }
}
