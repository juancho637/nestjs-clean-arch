import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RequestIdMiddleware } from '@common/helpers/infrastructure/middlewares';
import { HashModule } from '@common/adapters/hash/infrastructure';
import { ConfigurationModule } from '@common/adapters/configuration/infrastructure';
import { DatabaseModule } from '@common/adapters/database/infrastructure';
import { LoggerModule } from '@common/adapters/logger/infrastructure';
import { ExceptionModule } from '@common/adapters/exception/infrastructure';
import { TokenModule } from '@common/adapters/token/infrastructure';
import { PermissionModule } from '@modules/permissions/infrastructure';
import { RoleModule } from '@modules/roles/infrastructure';
import { CountryModule } from '@modules/countries/infrastructure';
import { StateModule } from '@modules/states/infrastructure';
import { CityModule } from '@modules/cities/infrastructure';
import { UserModule } from '@modules/users/infrastructure';
import { AuthModule } from '@modules/auth/infrastructure';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),

    // Common
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,
    ExceptionModule,
    HashModule,
    TokenModule,

    // Modules
    PermissionModule,
    RoleModule,
    CountryModule,
    StateModule,
    CityModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
