import { UserRepository } from '../../domain';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<string> {
    return 'UpdateUserUseCase';
  }
}
