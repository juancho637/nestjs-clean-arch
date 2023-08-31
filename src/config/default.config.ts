import { DefaultConfigType } from './types';
import { DataBaseConfig } from './database.config';
import { TypeOrmConfig } from './type-orm.config';
import { JwtConfig } from './jwt.config';
import { AppConfig } from './app.config';

export class DefaultConfig {
  private static instance: DefaultConfig;

  static getInstance(): DefaultConfig {
    if (!DefaultConfig.instance) {
      DefaultConfig.instance = new DefaultConfig();
    }

    return DefaultConfig.instance;
  }

  getConfig(): DefaultConfigType {
    return {
      app: AppConfig.getInstance().config,
      database: DataBaseConfig.getInstance().config,
      typeOrm: TypeOrmConfig.getInstance().config,
      jwt: JwtConfig.getInstance().config,
    };
  }
}
