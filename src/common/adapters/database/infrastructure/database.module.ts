import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigurationModule,
  ConfigurationService,
} from '@common/adapters/configuration/infrastructure';
import { TypeOrmConfigService } from './typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useClass: TypeOrmConfigService,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
