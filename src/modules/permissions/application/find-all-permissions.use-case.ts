import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  PermissionFilterType,
  PermissionRepositoryInterface,
  PermissionType,
  permissionErrorsCodes,
} from '../domain';

export class FindAllPermissionsUseCase {
  private readonly context = FindAllPermissionsUseCase.name;

  constructor(
    private readonly permissionRepository: PermissionRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run({
    pagination,
    sort,
    filters,
  }: FindAllFieldsDto<PermissionFilterType>): Promise<
    PaginatedResourceType<PermissionType>
  > {
    try {
      const permissionResource = await this.permissionRepository.findAll({
        pagination,
        sort,
        filters,
      });

      return permissionResource;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM021,
        context: this.context,
        error,
      });
    }
  }
}
