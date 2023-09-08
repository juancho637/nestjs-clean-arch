import { AppConfigType } from './app-config.type';
import { DataBaseConfigType } from './database-config.type';
import { JwtConfigType } from './jwt-config.type';
import { TypeOrmConfigType } from './type-orm-config.type';

export type ConfigurationType = {
  app: AppConfigType;
  database: DataBaseConfigType;
  typeOrm: TypeOrmConfigType;
  jwt: JwtConfigType;
};
