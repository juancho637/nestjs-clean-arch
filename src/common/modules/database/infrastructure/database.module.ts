import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm-config.service';
import { ConfigurationModule, ConfigurationService } from '../../configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
