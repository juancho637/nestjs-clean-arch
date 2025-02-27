import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { RolePermissionsEnum } from '@modules/roles/domain';
import { UserPermissionsEnum } from '@modules/users/domain';
import {
  PermissionPermissionsEnum,
  PermissionRepositoryInterface,
  PermissionType,
} from '../../domain';

export class PermissionsSeeder {
  private readonly context = PermissionsSeeder.name;

  constructor(
    private readonly permissionRepository: PermissionRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(): Promise<PermissionType[]> {
    const permissionPermissions = this.enumToArray(
      PermissionPermissionsEnum,
      'permissions',
    );
    const rolePermissions = this.enumToArray(RolePermissionsEnum, 'roles');
    const userPermissions = this.enumToArray(UserPermissionsEnum, 'users');

    const permissions = await this.permissionRepository.store([
      ...permissionPermissions,
      ...rolePermissions,
      ...userPermissions,
    ]);

    this.logger.debug({
      message: 'Development permissions seeded',
      context: this.context,
    });

    return permissions as PermissionType[];
  }

  private enumToArray<T>(enumObject: T, module: string) {
    return Object.keys(enumObject).map((key) => ({
      name: enumObject[key],
      module,
    }));
  }
}
