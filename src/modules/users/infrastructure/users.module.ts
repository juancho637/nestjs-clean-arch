import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  HashProvidersEnum,
  HashServiceInterface,
} from '@common/adapters/hash/domain';
import { HashModule } from '@common/adapters/hash/infrastructure';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import { LoggerModule } from '@common/adapters/logger/infrastructure';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import { ExceptionModule } from '@common/adapters/exception/infrastructure';
import { UserProvidersEnum, UserRepositoryInterface } from '../domain';
import {
  DeleteUserUseCase,
  FindAllUsersUseCase,
  FindByUserUseCase,
  StoreUserUseCase,
  UpdateUserUseCase,
  UserPolicy,
} from '../application';
import { UserEntity, UserTypeOrmRepository } from './persistence';
import {
  DeleteUserController,
  FindAllUsersController,
  FindByUserController,
  StoreUserController,
  UpdateUserController,
} from './api';
import { DevUsersSeeder, ProdUsersSeeder } from './seeders';
import { ConfigurationModule } from '@common/adapters/configuration/infrastructure';
import {
  AppConfigType,
  ConfigurationType,
} from '@common/adapters/configuration/domain';
import { ConfigService } from '@nestjs/config';
import { PermissionModule } from '@modules/permissions/infrastructure';
import { RoleModule } from '@modules/roles/infrastructure';
import { FindAllRolesUseCase } from '@modules/roles/application';
import { FindAllPermissionsUseCase } from '@modules/permissions/application';
import { RoleProvidersEnum } from '@modules/roles/domain';
import { PermissionProvidersEnum } from '@modules/permissions/domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    LoggerModule,
    ExceptionModule,
    HashModule,
    ConfigurationModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [
    FindAllUsersController,
    FindByUserController,
    StoreUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    {
      provide: UserProvidersEnum.USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
    UserPolicy,
    {
      provide: UserProvidersEnum.USER_SEEDER,
      inject: [
        ConfigService,
        UserProvidersEnum.USER_REPOSITORY,
        HashProvidersEnum.HASH_SERVICE,
        LoggerProvidersEnum.LOGGER_SERVICE,
      ],
      useFactory: (
        configService: ConfigService<ConfigurationType>,
        userRepository: UserRepositoryInterface,
        hashService: HashServiceInterface,
        loggerService: LoggerServiceInterface,
      ) => {
        const env = configService.get<AppConfigType>('app').env;

        return env !== 'prod'
          ? new DevUsersSeeder(userRepository, hashService, loggerService)
          : new ProdUsersSeeder(userRepository, hashService, loggerService);
      },
    },
    {
      inject: [
        UserProvidersEnum.USER_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: UserProvidersEnum.FIND_ALL_USERS_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindAllUsersUseCase(
          userRepository,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        UserProvidersEnum.USER_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: UserProvidersEnum.FIND_BY_USER_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindByUserUseCase(userRepository, loggerService, exceptionService),
    },
    {
      inject: [
        UserProvidersEnum.USER_REPOSITORY,
        RoleProvidersEnum.FIND_ALL_ROLES_USE_CASE,
        PermissionProvidersEnum.FIND_ALL_PERMISSIONS_USE_CASE,
        HashProvidersEnum.HASH_SERVICE,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: UserProvidersEnum.STORE_USER_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        findAllRolesUseCase: FindAllRolesUseCase,
        findAllPermissionsUseCase: FindAllPermissionsUseCase,
        hashService: HashServiceInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new StoreUserUseCase(
          userRepository,
          findAllRolesUseCase,
          findAllPermissionsUseCase,
          hashService,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        UserProvidersEnum.USER_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: UserProvidersEnum.UPDATE_USER_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new UpdateUserUseCase(userRepository, loggerService, exceptionService),
    },
    {
      inject: [
        UserProvidersEnum.USER_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: UserProvidersEnum.DELETE_USER_USE_CASE,
      useFactory: (
        userRepository: UserRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new DeleteUserUseCase(userRepository, loggerService, exceptionService),
    },
  ],
  exports: [
    UserProvidersEnum.FIND_ALL_USERS_USE_CASE,
    UserProvidersEnum.FIND_BY_USER_USE_CASE,
    UserProvidersEnum.STORE_USER_USE_CASE,
    UserProvidersEnum.UPDATE_USER_USE_CASE,
    UserProvidersEnum.DELETE_USER_USE_CASE,
  ],
})
export class UserModule {}
