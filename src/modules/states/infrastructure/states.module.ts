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
import { CountryModule } from '@modules/countries/infrastructure';
import { StateProvidersEnum, StateRepositoryInterface } from '../domain';
import { FindAllStatesUseCase, FindByStateUseCase } from '../application';
import { FindAllStatesController, FindByStateController } from './api';
import { StateEntity, StateTypeOrmRepository } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([StateEntity]),
    LoggerModule,
    ExceptionModule,
  ],
  controllers: [FindAllStatesController, FindByStateController],
  providers: [
    {
      provide: StateProvidersEnum.STATE_REPOSITORY,
      useClass: StateTypeOrmRepository,
    },
    {
      inject: [
        StateProvidersEnum.STATE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: StateProvidersEnum.FIND_ALL_STATES_USE_CASE,
      useFactory: (
        countryRepository: StateRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindAllStatesUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
    {
      inject: [
        StateProvidersEnum.STATE_REPOSITORY,
        LoggerProvidersEnum.LOGGER_SERVICE,
        ExceptionProvidersEnum.EXCEPTION_SERVICE,
      ],
      provide: StateProvidersEnum.FIND_BY_STATE_USE_CASE,
      useFactory: (
        countryRepository: StateRepositoryInterface,
        loggerService: LoggerServiceInterface,
        exceptionService: ExceptionServiceInterface,
      ) =>
        new FindByStateUseCase(
          countryRepository,
          loggerService,
          exceptionService,
        ),
    },
  ],
  exports: [
    StateProvidersEnum.FIND_ALL_STATES_USE_CASE,
    StateProvidersEnum.FIND_BY_STATE_USE_CASE,
  ],
})
export class StateModule {}
