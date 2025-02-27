import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { PermissionType } from '@modules/permissions/domain';
import { RoleRepositoryInterface, RoleType } from '../../domain';

export class RolesSeeder {
  private readonly context = RolesSeeder.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(permissions: PermissionType[]): Promise<RoleType[]> {
    const adminPermissions = [
      ...permissions.filter((permission) =>
        permission.module.includes('permissions'),
      ),
      ...permissions.filter((permission) =>
        permission.module.includes('roles'),
      ),
      ...permissions.filter((permission) =>
        permission.name.includes('any:user'),
      ),
      ...permissions.filter((permission) =>
        permission.module.includes('orders'),
      ),
    ];

    const sellerPermissions = [
      ...permissions.filter((permission) =>
        permission.name.includes('own:user'),
      ),
    ];

    const roles = await this.roleRepository.store([
      { name: 'admin', status: 'ACTIVE', permissions: adminPermissions },
      { name: 'seller', status: 'ACTIVE', permissions: sellerPermissions },
    ]);

    this.logger.debug({
      message: 'Development roles seeded',
      context: this.context,
    });

    return roles as RoleType[];
  }
}
