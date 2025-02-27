import {
  AppConfigType,
  DataBaseConfigType,
  JwtConfigType,
  TypeOrmConfigType,
} from './configs';

export type ConfigurationType = {
  app: AppConfigType;
  database: DataBaseConfigType;
  typeOrm: TypeOrmConfigType;
  jwt: JwtConfigType;
};
