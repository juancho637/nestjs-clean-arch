import { JwtConfigType } from '../../domain';

export class JwtConfig {
  private static instance: JwtConfig;
  private _config: JwtConfigType;

  private constructor() {
    this._config = {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '1h',
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
