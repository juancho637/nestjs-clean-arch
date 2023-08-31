import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AppConfigType, DefaultConfigType } from './config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(
    ConfigService<DefaultConfigType>,
  );
  const appPort = configService.get<AppConfigType>('app').port;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(appPort);
  logger.log(`🚀 Server running on port: ${appPort}`);
}

bootstrap();
