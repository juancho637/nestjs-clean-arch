import { Module } from '@nestjs/common';
import { ConfigurationModule, DatabaseModule } from './common';
import { UserModule } from './modules/users/infrastructure/user.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    UserModule.register(),
    AuthModule.register(),
  ],
})
export class AppModule {}
