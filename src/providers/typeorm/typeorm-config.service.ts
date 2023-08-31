import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { SeederOptions } from 'typeorm-extension';
import {
  DataBaseConfigType,
  DefaultConfigType,
  TypeOrmConfigType,
} from '@ecommerce/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<DefaultConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<DataBaseConfigType>('database').host,
      port: this.configService.get<DataBaseConfigType>('database').port,
      username: this.configService.get<DataBaseConfigType>('database').username,
      password: this.configService.get<DataBaseConfigType>('database').password,
      database: this.configService.get<DataBaseConfigType>('database').database,
      logging: this.configService.get<TypeOrmConfigType>('typeOrm').logging,
      synchronize:
        this.configService.get<TypeOrmConfigType>('typeOrm').synchronize,
      entities: [join(__dirname, '../', '../', '**', '*.entity.{ts,js}')],
      // seeds: [join(__dirname, 'seeds', '*.seed.{ts,js}')],
      autoLoadEntities: true,
      migrations: [join(__dirname, 'migrations', '**', '*.{ts,js}')],
    };
  }
}
