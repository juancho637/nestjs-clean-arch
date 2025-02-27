import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerProvidersEnum } from '../domain';

@Module({
  providers: [
    {
      provide: LoggerProvidersEnum.LOGGER_SERVICE,
      useClass: LoggerService,
    },
  ],
  exports: [LoggerProvidersEnum.LOGGER_SERVICE],
})
export class LoggerModule {}
