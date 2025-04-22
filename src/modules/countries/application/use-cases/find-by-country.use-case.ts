import { FindOneByFieldsDto } from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CountryFilterType,
  CountryRepositoryInterface,
  CountryType,
  countryErrorsCodes,
} from '../../domain';

export class FindByCountryUseCase {
  private readonly context = FindByCountryUseCase.name;

  constructor(
    private readonly countryRepository: CountryRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    { filter, relations }: FindOneByFieldsDto<CountryFilterType>,
    requestId: string,
  ): Promise<CountryType> {
    try {
      this.logger.log({
        message: `Start to find one by country`,
        context: this.context,
        requestId,
      });

      const country = await this.countryRepository.findOneBy({
        filter,
        relations,
      });

      this.logger.log({
        message: `End to find one by country`,
        context: this.context,
        requestId,
      });

      return country;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: countryErrorsCodes.CUT011,
        context: this.context,
        error,
      });
    }
  }
}
