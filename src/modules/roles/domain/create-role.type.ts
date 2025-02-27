import { RoleType } from './role.type';

export type CreateRoleType = Partial<RoleType> & {
  permissionsIds?: number[];
};
