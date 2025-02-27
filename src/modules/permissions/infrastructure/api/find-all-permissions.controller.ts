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
  PermissionFilterType,
  PermissionPermissionsEnum,
  PermissionProvidersEnum,
  PermissionType,
  permissionErrorsCodes,
} from '../../domain';
import { FindAllPermissionsUseCase } from '../../application';
import { PermissionPresenter } from '../permission.presenter';

@Controller()
export class FindAllPermissionsController {
  private readonly context = FindAllPermissionsController.name;

  constructor(
    @Inject(PermissionProvidersEnum.FIND_ALL_PERMISSIONS_USE_CASE)
    private readonly findAllPermissionsUseCase: FindAllPermissionsUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/permissions')
  @Auth<PermissionPermissionsEnum>(PermissionPermissionsEnum.LIST_PERMISSION)
  async run(
    @PaginationParams() paginationParams?: PaginationType,
    @SortingParams<PermissionFilterType>('id', 'name', 'module')
    sortParams?: SortingType<PermissionFilterType>,
    @FilteringParams<PermissionFilterType>('id', 'name', 'module')
    filterParams?: FilteringType<PermissionFilterType>[],
  ): Promise<PaginatedResourceType<Partial<PermissionType>>> {
    try {
      const permissions = await this.findAllPermissionsUseCase.run({
        pagination: paginationParams,
        sort: sortParams,
        filters: filterParams,
      });

      return {
        ...permissions,
        items: permissions.items.map(
          (permission) => new PermissionPresenter(permission),
        ),
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM022,
        context: this.context,
        error,
      });
    }
  }
}
