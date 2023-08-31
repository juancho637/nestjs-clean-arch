import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FindAllUsersController,
  FindByUserController,
  StoreUserController,
  UpdateUserController,
} from './api';
import { UserTypeOrmEntity, UserTypeOrmRepository } from './persistence';
import {
  FindAllUsersUseCase,
  FindByUserUseCase,
  StoreUserUseCase,
  UpdateUserUseCase,
} from '../application';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [
    FindByUserController,
    FindAllUsersController,
    StoreUserController,
    UpdateUserController,
  ],
  providers: [
    FindAllUsersUseCase,
    FindByUserUseCase,
    StoreUserUseCase,
    UpdateUserUseCase,
    Logger,
    {
      provide: 'UserRepository',
      useClass: UserTypeOrmRepository,
    },
  ],
})
export class UserModule {}
