import { DynamicModule, Logger, Module } from '@nestjs/common';
import { UserModule, UserTypeOrmRepository } from '@ecommerce/modules/users';
import { LoginController } from './api';
import { LoginUseCase } from '../application';
import { AuthUseCasesEnum } from '../domain';

@Module({
  imports: [UserModule.register()],
})
export class AuthModule {
  static register(): DynamicModule {
    return {
      module: AuthModule,
      controllers: [LoginController],
      providers: [
        Logger,
        {
          inject: [UserTypeOrmRepository],
          provide: AuthUseCasesEnum.LOGIN_USECASE,
          useFactory: (userRepositoy: UserTypeOrmRepository) =>
            new LoginUseCase(userRepositoy),
        },
      ],
      exports: [AuthUseCasesEnum.LOGIN_USECASE],
    };
  }
}
