import { Module } from '@nestjs/common';
import { ConfigurationModule, DatabaseModule } from './common';
import { UserModule } from './modules/users/infrastructure/user.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, UserModule],
})
export class AppModule {}
