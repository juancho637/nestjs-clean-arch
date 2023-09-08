import { UserRepository } from '@ecommerce/modules/users';
import { AuthType, LoginType } from '../../domain';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run({ email }: LoginType): Promise<AuthType> {
    const user = await this.userRepository.findOneBy({ email });

    return {
      accessToken: user.email,
      tokenType: 'Bearer',
    };
  }
}
