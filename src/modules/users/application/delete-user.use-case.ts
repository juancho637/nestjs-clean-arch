import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { UserRepositoryInterface, UserType, userErrorsCodes } from '../domain';

export class DeleteUserUseCase {
  private readonly context = DeleteUserUseCase.name;

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(id: number): Promise<UserType> {
    try {
      const user = await this.userRepository.delete(id);

      return user;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM051,
        context: this.context,
        error,
      });
    }
  }
}
