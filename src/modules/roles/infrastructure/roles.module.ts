import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { PermissionProvidersEnum } from '@modules/permissions/domain';
import { PermissionModule } from '@modules/permissions/infrastructure';
import { FindAllPermissionsUseCase } from '@modules/permissions/application';
import { RoleProvidersEnum, RoleRepositoryInterface } from '../domain';
import {
  DeleteRoleUseCase,
  FindAllRolesUseCase,
  FindByRoleUseCase,
  StoreRoleUseCase,
  UpdateRoleUseCase,
} from '../application';
import {
  DeleteRoleController,
  FindAllRolesController,
  FindByRoleController,
  StoreRoleController,
  UpdateRoleController,
} from './api';
import { RoleEntity, RoleTypeOrmRepository } from './persistence';
import { RolesSeeder } from './seeders';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    forwardRef(() => PermissionModule),
    LoggerModule,
    ExceptionModule,
  ],
  controllers: [
    FindAllRolesController,
    FindByRoleController,
    StoreRoleController,
    UpdateRoleController,
    DeleteRoleController,
  ],
  providers: [
    {
      provide: RoleProvidersEnum.ROLE_REPOSITORY,
      useClass: RoleTypeOrmRepository,
    },
    {
      provide: RoleProvidersEnum.ROLE_SEEDER,
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
      ],
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        loggerService: LoggerServiceInterface,
      ) => new RolesSeeder(roleRepositoy, loggerService),
    },
    {
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: RoleProvidersEnum.FIND_ALL_ROLES_USE_CASE,
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindAllRolesUseCase(roleRepositoy, loggerService, exceptionService),
    },
    {
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: RoleProvidersEnum.FIND_BY_ROLE_USE_CASE,
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindByRoleUseCase(roleRepositoy, loggerService, exceptionService),
    },
    {
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        PermissionProvidersEnum.FIND_ALL_PERMISSIONS_USE_CASE,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: RoleProvidersEnum.STORE_ROLE_USE_CASE,
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        findAllPermissionsUseCase: FindAllPermissionsUseCase,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new StoreRoleUseCase(
          roleRepositoy,
          findAllPermissionsUseCase,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: RoleProvidersEnum.UPDATE_ROLE_USE_CASE,
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new UpdateRoleUseCase(roleRepositoy, loggerService, exceptionService),
    },
    {
      inject: [
        RoleProvidersEnum.ROLE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: RoleProvidersEnum.DELETE_ROLE_USE_CASE,
      useFactory: (
        roleRepositoy: RoleRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new DeleteRoleUseCase(roleRepositoy, loggerService, exceptionService),
    },
  ],
  exports: [
    RoleProvidersEnum.FIND_ALL_ROLES_USE_CASE,
    RoleProvidersEnum.FIND_BY_ROLE_USE_CASE,
    RoleProvidersEnum.STORE_ROLE_USE_CASE,
    RoleProvidersEnum.UPDATE_ROLE_USE_CASE,
    RoleProvidersEnum.DELETE_ROLE_USE_CASE,
  ],
})
export class RoleModule {}
