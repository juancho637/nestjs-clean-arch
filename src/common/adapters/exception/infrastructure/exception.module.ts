import { Module } from '@nestjs/common';
import { ExceptionService } from './exception.service';
import { ExceptionProvidersEnum } from '../domain';
import { APP_FILTER } from '@nestjs/core';
import {
  AllExceptionFilter,
  BaseCustomExceptionFilter,
  ValidationExceptionFilter,
} from './filters';
import { LoggerModule } from '@common/adapters/logger/infrastructure';

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter, // Se ejecuta al final (si ningún otro lo capturó)
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter, // Más específico
    },
    {
      provide: APP_FILTER,
      useClass: BaseCustomExceptionFilter, // Más específico
    },
    {
      provide: ExceptionProvidersEnum.EXCEPTION_SERVICE,
      useClass: ExceptionService,
    },
  ],
  exports: [ExceptionProvidersEnum.EXCEPTION_SERVICE],
})
export class ExceptionModule {}
