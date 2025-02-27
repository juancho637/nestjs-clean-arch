import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigurationModule,
  ConfigurationService,
} from '@common/adapters/configuration/infrastructure';
import { TokenProvidersEnum } from '../domain';
import { JwtConfigService } from './jwt-config.service';
import { TokenJwtService } from './token-jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtPassportStrategy } from './strategies';
import { UserModule } from '@modules/users/infrastructure';
import { LoggerModule } from '@common/adapters/logger/infrastructure';
import { ExceptionModule } from '@common/adapters/exception/infrastructure';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useClass: JwtConfigService,
    }),
    UserModule,
    LoggerModule,
    ExceptionModule,
  ],
  providers: [
    {
      provide: TokenProvidersEnum.TOKEN_SERVICE,
      useClass: TokenJwtService,
    },
    JwtPassportStrategy,
  ],
  exports: [TokenProvidersEnum.TOKEN_SERVICE],
})
export class TokenModule {}
