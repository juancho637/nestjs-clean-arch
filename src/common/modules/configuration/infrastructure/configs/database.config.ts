import { DataBaseConfigType } from '../../domain';

export class DataBaseConfig {
  private static instance: DataBaseConfig;
  private _config: DataBaseConfigType;

  private constructor() {
    this._config = {
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_DATABASE ?? 'postgres',
    };
  }

  static getInstance(): DataBaseConfig {
    if (!DataBaseConfig.instance) {
      DataBaseConfig.instance = new DataBaseConfig();
    }
    return DataBaseConfig.instance;
  }

  get config(): DataBaseConfigType {
    return this._config;
  }
}
