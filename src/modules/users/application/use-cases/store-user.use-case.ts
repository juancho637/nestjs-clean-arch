import { UserRepository } from '../../domain';

export class StoreUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<string> {
    return 'StoreUserUseCase';
  }
}
