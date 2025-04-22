import { Controller, Get, Inject } from '@nestjs/common';
import {
  FilteringParams,
  PaginationParams,
  RequestId,
  SortingParams,
} from '@common/helpers/infrastructure';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import { FindAllCountriesUseCase } from '../../application';
import {
  countryErrorsCodes,
  CountryFilterType,
  CountryProvidersEnum,
} from '../../domain';
import {
  FilteringType,
  PaginationType,
  SortingType,
} from '@common/helpers/domain';
import { CountryPresenter } from '../country.presenter';

@Controller()
export class FindAllCountriesController {
  private readonly context = FindAllCountriesController.name;

  constructor(
    @Inject(CountryProvidersEnum.FIND_ALL_COUNTRIES_USE_CASE)
    private readonly findAllCountriesUseCase: FindAllCountriesUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/countries')
  async run(
    @RequestId() requestId: string,
    @PaginationParams() paginationParams?: PaginationType,
    @SortingParams<CountryFilterType>('id', 'name', 'isoCode', 'status')
    sortParams?: SortingType<CountryFilterType>,
    @FilteringParams<CountryFilterType>('id', 'name', 'isoCode', 'status')
    filterParams?: FilteringType<CountryFilterType>[],
  ) {
    try {
      this.logger.log({
        message: `Start to find all countries`,
        context: this.context,
        requestId,
      });

      const countries = await this.findAllCountriesUseCase.run(
        {
          pagination: paginationParams,
          sort: sortParams,
          filters: filterParams,
        },
        requestId,
      );

      this.logger.log({
        message: `End to find all countries`,
        context: this.context,
        requestId,
      });

      return {
        ...countries,
        items: countries.items.map((country) => new CountryPresenter(country)),
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: countryErrorsCodes.CUT011,
        context: this.context,
        error,
      });
    }
  }
}
