import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  RoleFilterType,
  RoleRepositoryInterface,
  RoleType,
  roleErrorsCodes,
} from '../domain';
import { FindOneByFieldsDto } from '@common/helpers/domain';

export class FindByRoleUseCase {
  private readonly context = FindByRoleUseCase.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run({
    filter,
    relations,
  }: FindOneByFieldsDto<RoleFilterType>): Promise<RoleType> {
    try {
      const role = await this.roleRepository.findOneBy({
        filter,
        relations,
      });

      return role;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL011,
        context: this.context,
        error,
      });
    }
  }
}
