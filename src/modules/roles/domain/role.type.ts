import { PermissionType } from '@modules/permissions/domain';
import { UserType } from '@modules/users/domain';

export type RoleType = {
  id: number;
  name: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  permissions?: PermissionType[];
  users?: UserType[];
};
