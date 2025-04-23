import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CityFilterType,
  CityRepositoryInterface,
  CityType,
  cityErrorsCodes,
} from '../../domain';

export class FindAllCitiesUseCase {
  private readonly context = FindAllCitiesUseCase.name;

  constructor(
    private readonly cityRepository: CityRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    {
      pagination,
      sort,
      filters,
      relations,
    }: FindAllFieldsDto<CityFilterType> = {},
    requestId: string,
  ): Promise<PaginatedResourceType<CityType>> {
    try {
      this.logger.log({
        message: `Start to find all cities`,
        context: this.context,
        requestId,
      });

      const cities = await this.cityRepository.findAll({
        pagination,
        sort,
        filters,
        relations,
      });

      this.logger.log({
        message: `End to find all cities`,
        context: this.context,
        requestId,
      });

      return cities;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT051,
        context: this.context,
        error,
      });
    }
  }
}
