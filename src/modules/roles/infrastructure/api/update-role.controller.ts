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
  RolePermissionsEnum,
  RoleProvidersEnum,
  roleErrorsCodes,
} from '../../domain';
import { UpdateRoleUseCase } from '../../application';
import { UpdateRoleDto } from '../dto';
import { RolePresenter } from '../role.presenter';

@Controller()
export class UpdateRoleController {
  private readonly context = UpdateRoleController.name;

  constructor(
    @Inject(RoleProvidersEnum.UPDATE_ROLE_USE_CASE)
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Put('api/roles/:id')
  @Auth<RolePermissionsEnum>(RolePermissionsEnum.UPDATE_ROLE)
  async run(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RolePresenter> {
    try {
      const role = await this.updateRoleUseCase.run(id, updateRoleDto);

      return new RolePresenter(role);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL042,
        context: this.context,
        error,
      });
    }
  }
}
