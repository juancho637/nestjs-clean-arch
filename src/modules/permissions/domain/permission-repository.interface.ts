import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import {
  CreatePermissionType,
  PermissionFilterType,
  PermissionType,
} from './types';

export interface PermissionRepositoryInterface<
  Entity extends PermissionType = PermissionType,
> {
  findOneBy(fields: PermissionFilterType): Promise<Entity>;
  findByIds(ids: number[]): Promise<Entity[]>;
  findAll(
    findAllFieldsDto: FindAllFieldsDto<PermissionFilterType>,
  ): Promise<PaginatedResourceType<Entity>>;
  store(
    createPermissionsFields: CreatePermissionType | CreatePermissionType[],
  ): Promise<Entity | Entity[]>;
}
