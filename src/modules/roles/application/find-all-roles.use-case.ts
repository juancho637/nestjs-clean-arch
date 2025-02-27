import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  RoleFilterType,
  RoleRepositoryInterface,
  RoleType,
  roleErrorsCodes,
} from '../domain';

export class FindAllRolesUseCase {
  private readonly context = FindAllRolesUseCase.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run({
    pagination,
    sort,
    filters,
  }: FindAllFieldsDto<RoleFilterType>): Promise<
    PaginatedResourceType<RoleType>
  > {
    try {
      const roleResource = await this.roleRepository.findAll({
        pagination,
        sort,
        filters,
      });

      return roleResource;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL021,
        context: this.context,
        error,
      });
    }
  }
}
