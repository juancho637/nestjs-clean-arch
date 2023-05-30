import { UserRepository } from '@ecommerce/modules/users';

export class FindByUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<string> {
    return 'FindByUserUseCase';
  }
}
