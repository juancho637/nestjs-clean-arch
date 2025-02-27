import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  UpdateUserType,
  UserRepositoryInterface,
  UserType,
  userErrorsCodes,
} from '../domain';

export class UpdateUserUseCase {
  private readonly context = UpdateUserUseCase.name;

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(id: number, updateUserFields: UpdateUserType): Promise<UserType> {
    try {
      const user = await this.userRepository.update(id, updateUserFields);

      return user;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM041,
        context: this.context,
        error,
      });
    }
  }
}
