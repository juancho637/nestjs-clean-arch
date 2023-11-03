import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@ecommerce/common/configuration';
import { DatabaseModule } from '@ecommerce/common/database';
import { LoggerModule } from '@ecommerce/common/logger';
import { ExceptionsModule } from '@ecommerce/common/exceptions';
import { GqlModule } from '@ecommerce/common/gql';
import { UserModule } from '@ecommerce/modules/users';
import { AuthModule } from '@ecommerce/modules/auth';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,
    ExceptionsModule,
    GqlModule,
    UserModule.register(),
    AuthModule.register(),
  ],
})
export class AppModule {}
