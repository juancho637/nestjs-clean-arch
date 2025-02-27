import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  UserFilterType,
  UserRepositoryInterface,
  UserType,
  userErrorsCodes,
} from '../domain';
import { FindOneByFieldsDto } from '@common/helpers/domain';

export class FindByUserUseCase {
  private readonly context = FindByUserUseCase.name;

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run({
    filter,
    relations,
  }: FindOneByFieldsDto<UserFilterType>): Promise<UserType> {
    try {
      const user = await this.userRepository.findOneBy({
        filter,
        relations,
      });

      return user;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM011,
        context: this.context,
        error,
      });
    }
  }
}
