import { RoleType } from '@modules/roles/domain';
import { UserType } from '@modules/users/domain';

export type PermissionType = {
  id: number;
  name: string;
  module: string;
  description?: string;
  roles?: RoleType[];
  users?: UserType[];
};
