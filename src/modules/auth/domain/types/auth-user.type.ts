import { UserType } from '@modules/users/domain';

export type AuthUserType = {
  info: UserType;
  permissions: string[];
};
