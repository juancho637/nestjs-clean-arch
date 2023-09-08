import { AppConfigType } from '../../domain';

export class AppConfig {
  private static instance: AppConfig;
  private _config: AppConfigType;

  private constructor() {
    this._config = {
      env: process.env.APP_ENV ?? 'local',
      port: parseInt(process.env.APP_PORT ?? '3000'),
      name: process.env.APP_NAME ?? 'App Name',
      debug: process.env.APP_DEBUG === 'true',
      url: this.setUrl(),
    };
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

  private setUrl(): string {
    const port = process.env.APP_PORT ?? '3000';

    return process.env.APP_URL
      ? `${process.env.APP_URL}:${port}`
      : `http://localhost:${port}`;
  }
}
