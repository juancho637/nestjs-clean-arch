import { Controller, Get, Inject } from '@nestjs/common';
import {
  FilteringType,
  PaginationType,
  SortingType,
  PaginatedResourceType,
} from '@common/helpers/domain';
import {
  PaginationParams,
  FilteringParams,
  SortingParams,
} from '@common/helpers/infrastructure';
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
  RoleFilterType,
  RolePermissionsEnum,
  RoleProvidersEnum,
  RoleType,
  roleErrorsCodes,
} from '../../domain';
import { FindAllRolesUseCase } from '../../application';
import { RolePresenter } from '../role.presenter';

@Controller()
export class FindAllRolesController {
  private readonly context = FindAllRolesController.name;

  constructor(
    @Inject(RoleProvidersEnum.FIND_ALL_ROLES_USE_CASE)
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/roles')
  // @Auth<RolePermissionsEnum>(RolePermissionsEnum.LIST_ROLE)
  async run(
    @PaginationParams() paginationParams?: PaginationType,
    @SortingParams<RoleFilterType>('id', 'name', 'status')
    sortParams?: SortingType<RoleFilterType>,
    @FilteringParams<RoleFilterType>('id', 'name', 'status')
    filterParams?: FilteringType<RoleFilterType>[],
  ): Promise<PaginatedResourceType<Partial<RoleType>>> {
    try {
      const roles = await this.findAllRolesUseCase.run({
        pagination: paginationParams,
        sort: sortParams,
        filters: filterParams,
      });

      return {
        ...roles,
        items: roles.items.map((role) => new RolePresenter(role)),
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL022,
        context: this.context,
        error,
      });
    }
  }
}
