import { join } from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.TYPEORM_SYNCHRONIZE === 'true',
  synchronize: false,
  entities: [join(__dirname, 'src', 'modules', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'database', 'migrations', '**', '*.{ts,js}')],
});
