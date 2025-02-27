import { PermissionType } from '@modules/permissions/domain';
import { RoleType } from '@modules/roles/domain';

export type UserType = {
  id: number;
  name: string;
  username: string;
  email?: string;
  password: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  roles?: RoleType[];
  permissions?: PermissionType[];
};
