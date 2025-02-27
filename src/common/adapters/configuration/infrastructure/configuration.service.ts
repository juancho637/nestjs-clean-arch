import { ConfigurationType } from '../domain';
import { AppConfig, DataBaseConfig, TypeOrmConfig, JwtConfig } from './configs';

export class ConfigurationService {
  private static instance: ConfigurationService;

  static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }

    return ConfigurationService.instance;
  }

  getConfig(): ConfigurationType {
    return {
      app: AppConfig.getInstance().config,
      database: DataBaseConfig.getInstance().config,
      typeOrm: TypeOrmConfig.getInstance().config,
      jwt: JwtConfig.getInstance().config,
    };
  }
}
