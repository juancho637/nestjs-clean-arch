import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationService } from '../../configuration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configurationService: ConfigurationService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configurationService.getConfig().database.host,
      port: this.configurationService.getConfig().database.port,
      username: this.configurationService.getConfig().database.username,
      password: this.configurationService.getConfig().database.password,
      database: this.configurationService.getConfig().database.database,
      logging: this.configurationService.getConfig().typeOrm.logging,
      synchronize: this.configurationService.getConfig().typeOrm.synchronize,
      entities: [
        join(
          __dirname,
          '../',
          '../',
          '../',
          '../',
          'modules',
          '**',
          '*.entity.{ts,js}',
        ),
      ],
      autoLoadEntities: true,
    };
  }
}
