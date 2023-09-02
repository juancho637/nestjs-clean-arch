import { TypeOrmConfigType } from '../../domain';

export class TypeOrmConfig {
  private static instance: TypeOrmConfig;
  private _config: TypeOrmConfigType;

  private constructor() {
    this._config = {
      logging: process.env.TYPEORM_LOGGING === 'true',
      synchronize: false,
    };
  }

  static getInstance(): TypeOrmConfig {
    if (!TypeOrmConfig.instance) {
      TypeOrmConfig.instance = new TypeOrmConfig();
    }
    return TypeOrmConfig.instance;
  }

  get config(): TypeOrmConfigType {
    return this._config;
  }
}
