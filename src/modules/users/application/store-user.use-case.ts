import { HashServiceInterface } from '@common/adapters/hash/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CreateUserType,
  UserRepositoryInterface,
  UserType,
  userErrorsCodes,
} from '../domain';
import { FilterRuleEnum } from '@common/helpers/domain';
import { FindAllRolesUseCase } from '@modules/roles/application';
import { FindAllPermissionsUseCase } from '@modules/permissions/application';

export class StoreUserUseCase {
  private readonly context = StoreUserUseCase.name;

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    private readonly findAllPermissionsUseCase: FindAllPermissionsUseCase,
    private readonly hashService: HashServiceInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(createUser: CreateUserType): Promise<UserType> {
    try {
      const { rolesIds, permissionsIds, ...createUserFields } = createUser;

      createUserFields['roles'] = this.validateRoles(rolesIds);
      createUserFields['permissions'] =
        this.validatePermissions(permissionsIds);

      const hashPassword = await this.hashService.hash(createUser.password);

      const user = await this.userRepository.store({
        ...createUserFields,
        status: 'ACTIVE',
        password: hashPassword,
      });

      return user as UserType;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM031,
        context: this.context,
        error,
      });
    }
  }

  private async validateRoles(rolesIds: number[]) {
    if (!Array.isArray(rolesIds)) {
      return;
    }

    return await this.findAllRolesUseCase
      .run({
        filters: [
          {
            property: 'id',
            value: rolesIds.join(','),
            rule: FilterRuleEnum.IN,
          },
        ],
      })
      .then((roles) => roles.items);
  }

  private async validatePermissions(permissionsIds: number[]) {
    if (!Array.isArray(permissionsIds)) {
      return;
    }

    return await this.findAllPermissionsUseCase
      .run({
        filters: [
          {
            property: 'id',
            value: permissionsIds.join(','),
            rule: FilterRuleEnum.IN,
          },
        ],
      })
      .then((permissions) => permissions.items);
  }
}
