import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { FilterRuleEnum } from '@common/helpers/domain';
import { RequestId } from '@common/helpers/infrastructure';
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
  // StatePermissionsEnum,
  StateProvidersEnum,
  stateErrorsCodes,
} from '../../domain';
import { FindByStateUseCase } from '../../application';
import { StatePresenter } from '../state.presenter';

@Controller()
export class FindByStateController {
  private readonly context = FindByStateController.name;

  constructor(
    @Inject(StateProvidersEnum.FIND_BY_STATE_USE_CASE)
    private readonly findByStateUseCase: FindByStateUseCase,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  @Get('api/states/:id')
  // @Auth<StatePermissionsEnum>(StatePermissionsEnum.READ_ANY_STATE)
  async run(
    @RequestId() requestId: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StatePresenter> {
    try {
      this.logger.log({
        message: `Start to find one by id state ${id}`,
        context: this.context,
        requestId,
      });

      const state = await this.findByStateUseCase.run(
        {
          filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
        },
        requestId,
      );

      this.logger.log({
        message: `End to find one by id state ${id}`,
        context: this.context,
        requestId,
      });

      return new StatePresenter(state);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: stateErrorsCodes.STE012,
        context: this.context,
        error,
      });
    }
  }
}
