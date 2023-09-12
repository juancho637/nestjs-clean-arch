import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@ecommerce/common/configuration';
import { DatabaseModule } from '@ecommerce/common/database';
import { LoggerModule } from '@ecommerce/common/logger';
import { UserModule } from './modules/users/infrastructure/user.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,
    UserModule.register(),
    AuthModule.register(),
  ],
})
export class AppModule {}
