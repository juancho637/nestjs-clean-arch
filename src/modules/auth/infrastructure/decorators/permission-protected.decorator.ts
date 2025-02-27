import { SetMetadata } from '@nestjs/common';

export const META_PERMISSIONS = 'permissions';

export const PermissionProtected = <T>(...permissions: T[]) => {
  return SetMetadata(META_PERMISSIONS, permissions);
};
