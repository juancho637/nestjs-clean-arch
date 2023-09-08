import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  ConfigurationType,
  DataBaseConfigType,
  TypeOrmConfigType,
} from '@ecommerce/common/configuration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigurationType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database = this.configService.get<DataBaseConfigType>('database');
    const typeOrm = this.configService.get<TypeOrmConfigType>('typeOrm');

    return {
      type: 'postgres',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      logging: typeOrm.logging,
      synchronize: typeOrm.synchronize,
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
