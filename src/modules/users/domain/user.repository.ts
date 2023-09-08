import { UserType } from './user.type';
import { CreateUserType } from './create-user.type';
import { UpdateUserType } from './update-user.type';
import { UserFilterType } from './user-filter.type';
import {
  FilteringType,
  PaginationType,
  SortingType,
} from '@ecommerce/common/helpers';

export interface UserRepository<Entity extends UserType = UserType> {
  findOneBy(fields: UserFilterType): Promise<Entity>;
  findAll(
    pagination: PaginationType,
    sort: SortingType,
    filters: FilteringType[],
  ): Promise<Entity[]>;
  store(createUserFields: CreateUserType): Promise<Entity>;
  update(id: number, updateUserFields: UpdateUserType): Promise<Entity>;
  delete(id: number): Promise<Entity>;
}
