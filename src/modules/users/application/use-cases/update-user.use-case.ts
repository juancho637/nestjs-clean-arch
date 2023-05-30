import { UserRepository } from '@ecommerce/modules/users';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<string> {
    return 'UpdateUserUseCase';
  }
}
