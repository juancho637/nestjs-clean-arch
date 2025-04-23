import { FindOneByFieldsDto } from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  CityFilterType,
  CityRepositoryInterface,
  CityType,
  cityErrorsCodes,
} from '../../domain';

export class FindByCityUseCase {
  private readonly context = FindByCityUseCase.name;

  constructor(
    private readonly cityRepository: CityRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    { filter, relations }: FindOneByFieldsDto<CityFilterType>,
    requestId: string,
  ): Promise<CityType> {
    try {
      this.logger.log({
        message: `Start to find one by city`,
        context: this.context,
        requestId,
      });

      const city = await this.cityRepository.findOneBy({
        filter,
        relations,
      });

      this.logger.log({
        message: `End to find one by city`,
        context: this.context,
        requestId,
      });

      return city;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT011,
        context: this.context,
        error,
      });
    }
  }
}
