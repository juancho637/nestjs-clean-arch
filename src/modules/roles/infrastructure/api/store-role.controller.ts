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
  RolePermissionsEnum,
  RoleProvidersEnum,
  roleErrorsCodes,
} from '../../domain';
import { StoreRoleUseCase } from '../../application';
import { CreateRoleDto } from '../dto';
import { RolePresenter } from '../role.presenter';

@Controller()
export class StoreRoleController {
  private readonly context = StoreRoleController.name;

  constructor(
    @Inject(RoleProvidersEnum.STORE_ROLE_USE_CASE)
    private readonly storeRoleUseCase: StoreRoleUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Post('api/roles')
  // @Auth<RolePermissionsEnum>(RolePermissionsEnum.CREATE_ROLE)
  async run(@Body() createRoleDto: CreateRoleDto): Promise<RolePresenter> {
    try {
      const role = await this.storeRoleUseCase.run(createRoleDto);

      return new RolePresenter(role);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL032,
        context: this.context,
        error,
      });
    }
  }
}
