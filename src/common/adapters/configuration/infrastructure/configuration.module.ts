import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConfigurationService.getInstance().getConfig],
      isGlobal: true,
    }),
  ],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}
