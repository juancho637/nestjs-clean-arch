import {
  FilteringType,
  PaginatedResourceType,
  PaginationType,
  SortingType,
} from '@ecommerce/common/helpers';
import { UserRepository, UserType } from '../../domain';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    pagination: PaginationType,
    sort: SortingType,
    filters: FilteringType[],
  ): Promise<PaginatedResourceType<Partial<UserType>>> {
    const userResource = await this.userRepository.findAll(
      pagination,
      sort,
      filters,
    );

    return userResource;
  }
}
