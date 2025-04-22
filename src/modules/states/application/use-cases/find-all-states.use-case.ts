import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  StateFilterType,
  StateRepositoryInterface,
  StateType,
  stateErrorsCodes,
} from '../../domain';

export class FindAllStatesUseCase {
  private readonly context = FindAllStatesUseCase.name;

  constructor(
    private readonly stateRepository: StateRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    {
      pagination,
      sort,
      filters,
      relations,
    }: FindAllFieldsDto<StateFilterType> = {},
    requestId: string,
  ): Promise<PaginatedResourceType<StateType>> {
    try {
      this.logger.log({
        message: `Start to find all countries`,
        context: this.context,
        requestId,
      });

      const countries = await this.stateRepository.findAll({
        pagination,
        sort,
        filters,
        relations,
      });

      this.logger.log({
        message: `End to find all countries`,
        context: this.context,
        requestId,
      });

      return countries;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE051,
        context: this.context,
        error,
      });
    }
  }
}
