import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CountryFilterType,
  CountryRepositoryInterface,
  CountryType,
  countryErrorsCodes,
} from '../../domain';

export class FindAllCountriesUseCase {
  private readonly context = FindAllCountriesUseCase.name;

  constructor(
    private readonly countryRepository: CountryRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    {
      pagination,
      sort,
      filters,
      relations,
    }: FindAllFieldsDto<CountryFilterType> = {},
    requestId: string,
  ): Promise<PaginatedResourceType<CountryType>> {
    try {
      this.logger.log({
        message: `Start to find all countries`,
        context: this.context,
        requestId,
      });

      const countries = await this.countryRepository.findAll({
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
        message: countryErrorsCodes.CUT051,
        context: this.context,
        error,
      });
    }
  }
}
