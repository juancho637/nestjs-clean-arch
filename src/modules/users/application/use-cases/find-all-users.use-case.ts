import { UserRepository, UserType } from '../../domain';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<UserType[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
