import { JwtConfigType } from '../../domain';

export class JwtConfig {
  private static instance: JwtConfig;
  private _config: JwtConfigType;

  private constructor() {
    this._config = {
      jwtSecret: process.env.JWT_SECRET ?? '4CGSs83iRYfF9nnJtQQCnNLgG95uPMA1',
      jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '3600',
    };
  }

  static getInstance(): JwtConfig {
    if (!JwtConfig.instance) {
      JwtConfig.instance = new JwtConfig();
    }
    return JwtConfig.instance;
  }

  get config(): JwtConfigType {
    return this._config;
  }
}
