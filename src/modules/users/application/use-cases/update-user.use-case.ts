import { UpdateUserType, UserRepository, UserType } from '../../domain';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number, updateUserFields: UpdateUserType): Promise<UserType> {
    const user = await this.userRepository.update(id, updateUserFields);

    return user;
  }
}
