import { FindOneByFieldsDto } from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  StateFilterType,
  StateRepositoryInterface,
  StateType,
  stateErrorsCodes,
} from '../../domain';

export class FindByStateUseCase {
  private readonly context = FindByStateUseCase.name;

  constructor(
    private readonly stateRepository: StateRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    { filter, relations }: FindOneByFieldsDto<StateFilterType>,
    requestId: string,
  ): Promise<StateType> {
    try {
      this.logger.log({
        message: `Start to find one by state`,
        context: this.context,
        requestId,
      });

      const state = await this.stateRepository.findOneBy({
        filter,
        relations,
      });

      this.logger.log({
        message: `End to find one by state`,
        context: this.context,
        requestId,
      });

      return state;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE011,
        context: this.context,
        error,
      });
    }
  }
}
