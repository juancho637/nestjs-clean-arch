import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import {
  ConfigurationType,
  JwtConfigType,
} from '@common/adapters/configuration/domain';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService<ConfigurationType>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const jwt = this.configService.get<JwtConfigType>('jwt');

    return {
      secret: jwt.jwtSecret,
      signOptions: {
        expiresIn: jwt.jwtExpirationTime,
      },
    };
  }
}
