import { forwardRef, Module } from '@nestjs/common';
import { UserProvidersEnum } from '@modules/users/domain';
import {
  FindByUserUseCase,
  StoreUserUseCase,
} from '@modules/users/application';
import { UserModule } from '@modules/users/infrastructure';
import {
  TokenProvidersEnum,
  TokenServiceInterface,
} from '@common/adapters/token/domain';
import { TokenModule } from '@common/adapters/token/infrastructure';
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
import { AuthUseCasesEnum } from '../domain';
import { SignInUseCase, SignUpUseCase } from '../application';
import { SignInController } from './api';
import { SignUpController } from './api/sign-up.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TokenModule),
    LoggerModule,
    ExceptionModule,
    HashModule,
  ],
  controllers: [SignInController],
  providers: [
    {
      inject: [
        UserProvidersEnum.FIND_BY_USER_USE_CASE,
        TokenProvidersEnum.TOKEN_SERVICE,
        HashProvidersEnum.HASH_SERVICE,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: AuthUseCasesEnum.SIGN_IN_USE_CASE,
      useFactory: (
        findByUserUseCase: FindByUserUseCase,
        tokenService: TokenServiceInterface,
        hashService: HashServiceInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new SignInUseCase(
          findByUserUseCase,
          tokenService,
          hashService,
          loggerService,
          exceptionService,
        ),
    },
    {
      provide: AuthUseCasesEnum.SIGN_UP_USE_CASE,
      inject: [
        UserProvidersEnum.FIND_BY_USER_USE_CASE,
        UserProvidersEnum.STORE_USER_USE_CASE,
        TokenProvidersEnum.TOKEN_SERVICE,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      useFactory: (
        findByUserUseCase: FindByUserUseCase,
        storeUserUseCase: StoreUserUseCase,
        tokenService: TokenServiceInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new SignUpUseCase(
          findByUserUseCase,
          storeUserUseCase,
          tokenService,
          loggerService,
          exceptionService,
        ),
    },
  ],
  exports: [AuthUseCasesEnum.SIGN_IN_USE_CASE],
})
export class AuthModule {}
