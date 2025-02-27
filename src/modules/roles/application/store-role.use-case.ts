import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CreateRoleType,
  RoleRepositoryInterface,
  RoleType,
  roleErrorsCodes,
} from '../domain';
import { FilterRuleEnum } from '@common/helpers/domain';
import { FindAllPermissionsUseCase } from '@modules/permissions/application';

export class StoreRoleUseCase {
  private readonly context = StoreRoleUseCase.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly findAllPermissionsUseCase: FindAllPermissionsUseCase,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(createRole: CreateRoleType): Promise<RoleType> {
    try {
      const { permissionsIds, ...createRoleFields } = createRole;

      createRoleFields['permissions'] = await this.findAllPermissionsUseCase
        .run({
          pagination: { page: 1, size: 100 },
          filters: [
            {
              property: 'id',
              value: permissionsIds.join(','),
              rule: FilterRuleEnum.IN,
            },
          ],
        })
        .then((permissions) => permissions.items);

      const role = await this.roleRepository.store({
        ...createRoleFields,
        status: 'ACTIVE',
      });

      return role as RoleType;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL031,
        context: this.context,
        error,
      });
    }
  }
}
