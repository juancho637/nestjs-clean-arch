import { UserRepository, UserType } from '../../domain';

export class FindByUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<UserType> {
    const user = await this.userRepository.findOneBy({ id });

    return user;
  }
}
