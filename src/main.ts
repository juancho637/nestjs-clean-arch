import { APP_GUARD, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
  AppConfigType,
  ConfigurationType,
} from '@common/adapters/configuration/domain';
import {
  ResponseInterceptor,
  LoggingInterceptor,
} from '@common/helpers/infrastructure';
import { LoggerProvidersEnum } from '@common/adapters/logger/domain';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  const logger = app.get(LoggerProvidersEnum.LOGGER_SERVICE);
  const configService = app.get(ConfigService<ConfigurationType>);
  const { port } = configService.get<AppConfigType>('app');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(port);

  logger.log({
    context: 'Bootstrap',
    message: `🚀 Server running on port: ${port}`,
  });
}

bootstrap();
