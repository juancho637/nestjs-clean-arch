import { UserRepository, UserType } from '@ecommerce/modules/users';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<UserType[]> {
    const users = this.userRepository.findAll();

    return users;
  }
}
