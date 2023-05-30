import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FindAllUsersController,
  FindByUserController,
  StoreUserController,
  UpdateUserController,
  UserTypeOrmEntity,
  UserTypeOrmRepository,
} from '@ecommerce/modules/users';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [
    FindByUserController,
    FindAllUsersController,
    StoreUserController,
    UpdateUserController,
  ],
  providers: [UserTypeOrmRepository],
})
export class UserModule {}
