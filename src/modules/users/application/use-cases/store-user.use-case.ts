import { UserRepository } from '@ecommerce/modules/users';

export class StoreUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<string> {
    return 'StoreUserUseCase';
  }
}
