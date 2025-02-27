import { CreateUserRepositoryType } from './create-user-repository.type';

export type CreateUserType = Omit<
  CreateUserRepositoryType,
  'status' | 'roles' | 'permissions'
> & {
  rolesIds?: number[];
  permissionsIds?: number[];
};
