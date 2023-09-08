import { FilteringType, PaginationType, SortingType } from 'src/common';
import { UserRepository, UserType } from '../../domain';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(
    pagination: PaginationType,
    sort: SortingType,
    filters: FilteringType[],
  ): Promise<UserType[]> {
    const users = await this.userRepository.findAll(pagination, sort, filters);

    return users;
  }
}
