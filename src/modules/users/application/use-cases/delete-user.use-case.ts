import { UserRepository, UserType } from '../../domain';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<UserType> {
    const user = await this.userRepository.delete(id);

    return user;
  }
}
