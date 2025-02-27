import {
  FindAllFieldsDto,
  FindOneByFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { RoleType } from './role.type';
import { RoleFilterType } from './role-filter.type';
import { CreateRoleType } from './create-role.type';
import { UpdateRoleType } from './update-role.type';

export interface RoleRepositoryInterface<Entity extends RoleType = RoleType> {
  findOneBy(
    findOneByFieldsDto: FindOneByFieldsDto<RoleFilterType>,
  ): Promise<Entity>;
  findAll(
    findAllFieldsDto: FindAllFieldsDto<RoleFilterType>,
  ): Promise<PaginatedResourceType<Entity>>;
  store(
    createRoleFields: CreateRoleType | CreateRoleType[],
  ): Promise<Entity | Entity[]>;
  update(id: number, updateRoleFields: UpdateRoleType): Promise<Entity>;
  delete(id: number): Promise<Entity>;
}
