import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ecommerce',
      password: 'password',
      database: 'ecommerce',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
