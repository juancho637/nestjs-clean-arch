import { AppConfigType } from './types';

export class AppConfig {
  private static instance: AppConfig;
  private _config: AppConfigType;

  private constructor() {
    this._config = {
      env: process.env.APP_ENV ?? 'local',
      port: parseInt(process.env.APP_PORT ?? '3000'),
      name: process.env.APP_NAME ?? 'App Name',
      debug: process.env.APP_DEBUG === 'true',
    };

    this.setUrl();
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get config(): AppConfigType {
    return this._config;
  }

  private setUrl(): void {
    const urlConfig = {
      url: process.env.APP_URL
        ? `${process.env.APP_URL}:${this._config.port}`
        : `http://localhost:${this._config.port}`,
    };

    Object.assign(this._config, urlConfig);
  }
}
