import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import {
  HashServiceInterface,
  HashProvidersEnum,
} from '@common/adapters/hash/domain';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import {
  UserProvidersEnum,
  UserRepositoryInterface,
} from '@modules/users/domain';
import {
  PermissionProvidersEnum,
  PermissionRepositoryInterface,
} from '@modules/permissions/domain';
import {
  RoleProvidersEnum,
  RoleRepositoryInterface,
} from '@modules/roles/domain';
import { PermissionsSeeder } from '@modules/permissions/infrastructure';
import { RolesSeeder } from '@modules/roles/infrastructure';
import { ProdUsersSeeder } from '@modules/users/infrastructure/seeders/prod-users.seeder';

export async function runProdSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const loggerService = app.get<LoggerServiceInterface>(
    LoggerProvidersEnum.LOGGER_SERVICE,
  );

  const permissions = await new PermissionsSeeder(
    app.get<PermissionRepositoryInterface>(
      PermissionProvidersEnum.PERMISSION_REPOSITORY,
    ),
    loggerService,
  ).seed();

  const roles = await new RolesSeeder(
    app.get<RoleRepositoryInterface>(RoleProvidersEnum.ROLE_REPOSITORY),
    loggerService,
  ).seed(permissions);

  await new ProdUsersSeeder(
    app.get<UserRepositoryInterface>(UserProvidersEnum.USER_REPOSITORY),
    app.get<HashServiceInterface>(HashProvidersEnum.HASH_SERVICE),
    loggerService,
  ).seed(roles);

  await app.close();
}
