import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { FilterRuleEnum } from '@common/helpers/domain';
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
  RolePermissionsEnum,
  RoleProvidersEnum,
  roleErrorsCodes,
} from '../../domain';
import { FindByRoleUseCase } from '../../application';
import { RolePresenter } from '../role.presenter';

@Controller()
export class FindByRoleController {
  private readonly context = FindByRoleController.name;

  constructor(
    @Inject(RoleProvidersEnum.FIND_BY_ROLE_USE_CASE)
    private readonly findByRoleUseCase: FindByRoleUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/roles/:id')
  // @Auth<RolePermissionsEnum>(RolePermissionsEnum.READ_ROLE)
  async run(@Param('id', ParseIntPipe) id: number): Promise<RolePresenter> {
    try {
      const role = await this.findByRoleUseCase.run({
        filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
      });

      return new RolePresenter(role);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL012,
        context: this.context,
        error,
      });
    }
  }
}
