import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/infrastructure/user.module';
import { TypeOrmConfigService } from './providers';
import { DefaultConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DefaultConfig.getInstance().getConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
