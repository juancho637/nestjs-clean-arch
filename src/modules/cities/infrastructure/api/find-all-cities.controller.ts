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
import { FindAllCitiesUseCase } from '../../application';
import {
  cityErrorsCodes,
  CityFilterType,
  CityProvidersEnum,
} from '../../domain';
import {
  FilteringType,
  PaginationType,
  SortingType,
} from '@common/helpers/domain';
import { CityPresenter } from '../city.presenter';

@Controller()
export class FindAllCitiesController {
  private readonly context = FindAllCitiesController.name;

  constructor(
    @Inject(CityProvidersEnum.FIND_ALL_CITIES_USE_CASE)
    private readonly findAllCitiesUseCase: FindAllCitiesUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/cities')
  async run(
    @RequestId() requestId: string,
    @PaginationParams() paginationParams?: PaginationType,
    @SortingParams<CityFilterType>('id', 'name', 'status')
    sortParams?: SortingType<CityFilterType>,
    @FilteringParams<CityFilterType>('id', 'name', 'status')
    filterParams?: FilteringType<CityFilterType>[],
  ) {
    try {
      this.logger.log({
        message: `Start to find all cities`,
        context: this.context,
        requestId,
      });

      const cities = await this.findAllCitiesUseCase.run(
        {
          pagination: paginationParams,
          sort: sortParams,
          filters: filterParams,
        },
        requestId,
      );

      this.logger.log({
        message: `End to find all cities`,
        context: this.context,
        requestId,
      });

      return {
        ...cities,
        items: cities.items.map((city) => new CityPresenter(city)),
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT011,
        context: this.context,
        error,
      });
    }
  }
}
