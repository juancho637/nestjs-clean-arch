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
import {
  FilteringType,
  PaginationType,
  SortingType,
} from '@common/helpers/domain';
import { FindAllStatesUseCase } from '../../application';
import {
  stateErrorsCodes,
  StateFilterType,
  StateProvidersEnum,
} from '../../domain';
import { StatePresenter } from '../state.presenter';

@Controller()
export class FindAllStatesController {
  private readonly context = FindAllStatesController.name;

  constructor(
    @Inject(StateProvidersEnum.FIND_ALL_STATES_USE_CASE)
    private readonly findAllStatesUseCase: FindAllStatesUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/states')
  async run(
    @RequestId() requestId: string,
    @PaginationParams() paginationParams?: PaginationType,
    @SortingParams<StateFilterType>('id', 'name', 'status', 'countryId')
    sortParams?: SortingType<StateFilterType>,
    @FilteringParams<StateFilterType>('id', 'name', 'status', 'countryId')
    filterParams?: FilteringType<StateFilterType>[],
  ) {
    try {
      this.logger.log({
        message: `Start to find all states`,
        context: this.context,
        requestId,
      });

      const states = await this.findAllStatesUseCase.run(
        {
          pagination: paginationParams,
          sort: sortParams,
          filters: filterParams,
        },
        requestId,
      );

      this.logger.log({
        message: `End to find all states`,
        context: this.context,
        requestId,
      });

      return {
        ...states,
        items: states.items.map((state) => new StatePresenter(state)),
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE011,
        context: this.context,
        error,
      });
    }
  }
}
