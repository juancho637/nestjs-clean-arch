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
import { CityProvidersEnum, CityRepositoryInterface } from '../domain';
import { FindAllCitiesUseCase, FindByCityUseCase } from '../application';
import { FindAllCitiesController, FindByCityController } from './api';
import { CityEntity, CityTypeOrmRepository } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    LoggerModule,
    ExceptionModule,
  ],
  controllers: [FindAllCitiesController, FindByCityController],
  providers: [
    {
      provide: CityProvidersEnum.CITY_REPOSITORY,
      useClass: CityTypeOrmRepository,
    },
    {
      inject: [
        CityProvidersEnum.CITY_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: CityProvidersEnum.FIND_ALL_CITIES_USE_CASE,
      useFactory: (
        countryRepository: CityRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindAllCitiesUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        CityProvidersEnum.CITY_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: CityProvidersEnum.FIND_BY_CITY_USE_CASE,
      useFactory: (
        countryRepository: CityRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindByCityUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
  ],
  exports: [
    CityProvidersEnum.FIND_ALL_CITIES_USE_CASE,
    CityProvidersEnum.FIND_BY_CITY_USE_CASE,
  ],
})
export class CityModule {}
