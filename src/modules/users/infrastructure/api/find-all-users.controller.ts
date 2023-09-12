import { Controller, Get, Inject } from '@nestjs/common';
import {
  PaginationParams,
  FilteringParams,
  FilteringType,
  PaginationType,
  SortingType,
  SortingParams,
  PaginatedResourceType,
} from '@ecommerce/common/helpers';
import { FindAllUsersUseCase } from '../../application';
import { UserType, UserUseCasesEnum } from '../../domain';
import { UserPresenter } from '../user.presenter';

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
  ): Promise<PaginatedResourceType<Partial<UserType>>> {
    const userResource = await this.findAllUsersUseCase.run(
      paginationParams,
      sortParams,
      filterParams,
    );

    return {
      ...userResource,
      items: userResource.items.map((user) => new UserPresenter(user)),
    };
  }
}
