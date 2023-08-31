import { AppConfigType } from './app.type';
import { DataBaseConfigType } from './database-config.type';
import { JwtConfigType } from './jwt-config.type';
import { TypeOrmConfigType } from './type-orm-config.type';

export type DefaultConfigType = {
  app: AppConfigType;
  database: DataBaseConfigType;
  typeOrm: TypeOrmConfigType;
  jwt: JwtConfigType;
};
