import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  LoggerServiceInterface,
  LoggerProvidersEnum,
} from '@common/adapters/logger/domain';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
// import { Auth } from '@modules/auth/infrastructure';
import { FilterRuleEnum } from '@common/helpers/domain';
import { RequestId } from '@common/helpers/infrastructure';
import {
  // CityPermissionsEnum,
  CityProvidersEnum,
  cityErrorsCodes,
} from '../../domain';
import { FindByCityUseCase } from '../../application';
import { CityPresenter } from '../city.presenter';

@Controller()
export class FindByCityController {
  private readonly context = FindByCityController.name;

  constructor(
    @Inject(CityProvidersEnum.FIND_BY_CITY_USE_CASE)
    private readonly findByCityUseCase: FindByCityUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/cities/:id')
  // @Auth<CityPermissionsEnum>(CityPermissionsEnum.READ_ANY_CITY)
  async run(
    @RequestId() requestId: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CityPresenter> {
    try {
      this.logger.log({
        message: `Start to find one by id city ${id}`,
        context: this.context,
        requestId,
      });

      const city = await this.findByCityUseCase.run(
        {
          filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
        },
        requestId,
      );

      this.logger.log({
        message: `End to find one by id city ${id}`,
        context: this.context,
        requestId,
      });

      return new CityPresenter(city);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: cityErrorsCodes.CIT012,
        context: this.context,
        error,
      });
    }
  }
}
