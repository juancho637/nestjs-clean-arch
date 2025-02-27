import { forwardRef, Module } from '@nestjs/common';
import { UserProvidersEnum } from '@modules/users/domain';
import { FindByUserUseCase } from '@modules/users/application';
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
import { SignInUseCase } from '../application';
import { SignInController } from './api';

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
  ],
  exports: [AuthUseCasesEnum.SIGN_IN_USE_CASE],
})
export class AuthModule {}
