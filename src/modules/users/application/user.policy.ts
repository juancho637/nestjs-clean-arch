import { Injectable } from '@nestjs/common';
import { AuthUserType } from '@modules/auth/domain';
import { GeneralPolicy } from '@common/helpers/application';
import { UserType } from '../domain';

@Injectable()
export class UserPolicy extends GeneralPolicy {
  canUpdate(authUser: AuthUserType, targetUser: UserType): boolean {
    return (
      this.hasPermission(authUser.permissions, 'update:any:user') ||
      authUser.info.id === targetUser.id
    );
  }

  canDelete(authUser: AuthUserType): boolean {
    return this.hasPermission(authUser.permissions, 'delete:any:user');
  }

  canView(authUser: AuthUserType, targetUser: UserType): boolean {
    return (
      this.hasPermission(authUser.permissions, 'view:any:user') ||
      authUser.info.id === targetUser.id
    );
  }

  canList(authUser: AuthUserType): boolean {
    return this.hasPermission(authUser.permissions, 'list:any:user');
  }

  canStore(authUser: AuthUserType): boolean {
    return this.hasPermission(authUser.permissions, 'create:any:user');
  }

  canUpdatePassword(authUser: AuthUserType, targetUser: UserType): boolean {
    if (authUser.info.id === targetUser.id) {
      return this.hasPermission(
        authUser.permissions,
        'update:own:user:password',
      );
    }

    return this.hasPermission(authUser.permissions, 'update:any:user:password');
  }
}
