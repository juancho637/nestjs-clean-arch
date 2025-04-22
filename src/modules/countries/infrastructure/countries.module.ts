import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import { LoggerModule } from '@common/adapters/logger/infrastructure';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import { ExceptionModule } from '@common/adapters/exception/infrastructure';
import { CountryProvidersEnum, CountryRepositoryInterface } from '../domain';
import { FindAllCountriesUseCase, FindByCountryUseCase } from '../application';
import { FindAllCountriesController, FindByCountryController } from './api';
import { CountryEntity, CountryTypeOrmRepository } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([CountryEntity]),
    LoggerModule,
    ExceptionModule,
  ],
  controllers: [FindAllCountriesController, FindByCountryController],
  providers: [
    {
      provide: CountryProvidersEnum.COUNTRY_REPOSITORY,
      useClass: CountryTypeOrmRepository,
    },
    {
      inject: [
        CountryProvidersEnum.COUNTRY_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: CountryProvidersEnum.FIND_ALL_COUNTRIES_USE_CASE,
      useFactory: (
        countryRepository: CountryRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindAllCountriesUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        CountryProvidersEnum.COUNTRY_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: CountryProvidersEnum.FIND_BY_COUNTRY_USE_CASE,
      useFactory: (
        countryRepository: CountryRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindByCountryUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
  ],
  exports: [CountryProvidersEnum.FIND_ALL_COUNTRIES_USE_CASE],
})
export class CountryModule {}
