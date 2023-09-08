import { Controller, Get, Inject } from '@nestjs/common';
import {
  PaginationParams,
  FilteringParams,
  FilteringType,
  PaginationType,
  SortingType,
  SortingParams,
} from '@ecommerce/common/helpers';
import { FindAllUsersUseCase } from '../../application';
import { UserUseCasesEnum } from '../../domain';

@Controller()
export class FindAllUsersController {
  constructor(
    @Inject(UserUseCasesEnum.FIND_ALL_USERS_USECASE)
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) {}

  @Get('api/users')
  async run(
    @PaginationParams() paginationParams: PaginationType,
    @SortingParams(['id', 'name', 'email']) sortParams?: SortingType,
    @FilteringParams(['id', 'name', 'email']) filterParams?: FilteringType[],
  ) {
    return await this.findAllUsersUseCase.run(
      paginationParams,
      sortParams,
      filterParams,
    );
  }
}
