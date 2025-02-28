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
  RolePermissionsEnum,
  RoleProvidersEnum,
  roleErrorsCodes,
} from '../../domain';
import { DeleteRoleUseCase } from '../../application';
import { RolePresenter } from '../role.presenter';

@Controller()
export class DeleteRoleController {
  private readonly context = DeleteRoleController.name;

  constructor(
    @Inject(RoleProvidersEnum.DELETE_ROLE_USE_CASE)
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Delete('api/roles/:id')
  @Auth<RolePermissionsEnum>(RolePermissionsEnum.DELETE_ROLE)
  async run(@Param('id', ParseIntPipe) id: number): Promise<RolePresenter> {
    try {
      const role = await this.deleteRoleUseCase.run(id);

      return new RolePresenter(role);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL052,
        context: this.context,
        error,
      });
    }
  }
}
