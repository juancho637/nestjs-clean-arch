import { faker } from '@faker-js/faker';
import { HashServiceInterface } from '@common/adapters/hash/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import {
  CreateUserRepositoryType,
  UserRepositoryInterface,
  UserType,
} from '../../domain';
import { RoleType } from '@modules/roles/domain';
import { FilterRuleEnum } from '@common/helpers/domain';

export class DevUsersSeeder {
  private readonly context = DevUsersSeeder.name;

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashService: HashServiceInterface,
    private readonly logger: LoggerServiceInterface,
  ) {}

  async seed(roles: RoleType[]): Promise<UserType[]> {
    const usersFields: CreateUserRepositoryType[] = [];
    const password = await this.hashService.hash('password');

    usersFields.push({
      name: 'Admin User',
      username: 'admin',
      email: 'admin@admin.com',
      password: password,
      status: 'ACTIVE',
      roles: roles.filter((role) => role.name === 'admin'),
    });

    for (let i = 0; i < 10; i++) {
      const personInfo = faker.person;
      const internetInfo = faker.internet;

      usersFields.push({
        name: personInfo.fullName(),
        username: internetInfo.userName(),
        email: internetInfo.email(),
        password: password,
        status: 'ACTIVE',
        roles: [faker.helpers.arrayElement(roles)],
      });
    }

    const usersIds = await this.userRepository
      .store(usersFields)
      .then((users: UserType[]) => users.map((user) => user.id));

    const users = await this.userRepository
      .findAll({
        pagination: { page: 1, size: 100 },
        filters: [
          {
            property: 'id',
            rule: FilterRuleEnum.IN,
            value: usersIds.join(','),
          },
        ],
        relations: ['roles'],
      })
      .then((users) => users.items);

    this.logger.debug({
      message: 'Development users seeded',
      context: this.context,
    });

    return users as UserType[];
  }
}
