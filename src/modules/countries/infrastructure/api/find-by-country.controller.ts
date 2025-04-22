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
import {
  // CountryPermissionsEnum,
  CountryProvidersEnum,
  countryErrorsCodes,
} from '../../domain';
import { FindByCountryUseCase } from '../../application';
import { CountryPresenter } from '../country.presenter';
import { FilterRuleEnum } from '@common/helpers/domain';
import { RequestId } from '@common/helpers/infrastructure';

@Controller()
export class FindByCountryController {
  private readonly context = FindByCountryController.name;

  constructor(
    @Inject(CountryProvidersEnum.FIND_BY_COUNTRY_USE_CASE)
    private readonly findByCountryUseCase: FindByCountryUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/countries/:id')
  // @Auth<CountryPermissionsEnum>(CountryPermissionsEnum.READ_ANY_COUNTRY)
  async run(
    @RequestId() requestId: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CountryPresenter> {
    try {
      this.logger.log({
        message: `Start to find one by id country ${id}`,
        context: this.context,
        requestId,
      });

      const country = await this.findByCountryUseCase.run(
        {
          filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
        },
        requestId,
      );

      this.logger.log({
        message: `End to find one by id country ${id}`,
        context: this.context,
        requestId,
      });

      return new CountryPresenter(country);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: countryErrorsCodes.CUT012,
        context: this.context,
        error,
      });
    }
  }
}
