import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AppConfigType,
  ConfigurationType,
} from '@ecommerce/common/configuration';
import { LoggerService } from '@ecommerce/common/logger';
import {
  ResponseInterceptor,
  LoggingInterceptor,
} from '@ecommerce/common/helpers';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  const configService = app.get(ConfigService<ConfigurationType>);
  const { port } = configService.get<AppConfigType>('app');

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.log({
    context: 'Bootstrap',
    message: `🚀 Server running on port: ${port}`,
  });
}

bootstrap();
