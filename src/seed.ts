import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionProvidersEnum } from '@modules/permissions/domain';
import { RoleProvidersEnum } from '@modules/roles/domain';
import { UserProvidersEnum } from '@modules/users/domain';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const PermissionSeeder = app.get(PermissionProvidersEnum.PERMISSION_SEEDER);
  const permissions = await PermissionSeeder.seed();

  const roleSeeder = app.get(RoleProvidersEnum.ROLE_SEEDER);
  const roles = await roleSeeder.seed(permissions);

  const userSeeder = app.get(UserProvidersEnum.USER_SEEDER);
  await userSeeder.seed(roles);

  await app.close();
}

bootstrap().catch((err) => console.error(err));
