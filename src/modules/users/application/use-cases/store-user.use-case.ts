import { CreateUserType, UserRepository, UserType } from '../../domain';

export class StoreUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(createUser: CreateUserType): Promise<UserType> {
    const user = await this.userRepository.store(createUser);

    return user;
  }
}
