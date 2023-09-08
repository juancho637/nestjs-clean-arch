import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FindAllUsersController,
  FindByUserController,
  StoreUserController,
  UpdateUserController,
} from './api';
import { UserTypeOrmEntity, UserTypeOrmRepository } from './persistence';
import {
  DeleteUserUseCase,
  FindAllUsersUseCase,
  FindByUserUseCase,
  StoreUserUseCase,
  UpdateUserUseCase,
} from '../application';
import { UserUseCasesEnum } from '../domain';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
})
export class UserModule {
  static register(): DynamicModule {
    return {
      module: UserModule,
      controllers: [
        FindAllUsersController,
        FindByUserController,
        StoreUserController,
        UpdateUserController,
      ],
      providers: [
        Logger,
        UserTypeOrmRepository,
        {
          inject: [UserTypeOrmRepository],
          provide: UserUseCasesEnum.FIND_ALL_USERS_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new FindAllUsersUseCase(userRepositoy),
        },
        {
          inject: [UserTypeOrmRepository],
          provide: UserUseCasesEnum.FIND_ONE_USER_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new FindByUserUseCase(userRepositoy),
        },
        {
          inject: [UserTypeOrmRepository],
          provide: UserUseCasesEnum.STORE_USER_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new StoreUserUseCase(userRepositoy),
        },
        {
          inject: [UserTypeOrmRepository],
          provide: UserUseCasesEnum.UPDATE_USER_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new UpdateUserUseCase(userRepositoy),
        },
        {
          inject: [UserTypeOrmRepository],
          provide: UserUseCasesEnum.DELETE_USER_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new DeleteUserUseCase(userRepositoy),
        },
      ],
      exports: [UserTypeOrmRepository],
    };
  }
}
