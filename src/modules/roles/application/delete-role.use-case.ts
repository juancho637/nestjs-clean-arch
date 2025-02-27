import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { RoleRepositoryInterface, RoleType, roleErrorsCodes } from '../domain';

export class DeleteRoleUseCase {
  private readonly context = DeleteRoleUseCase.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(id: number): Promise<RoleType> {
    try {
      const role = await this.roleRepository.delete(id);

      return role;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL051,
        context: this.context,
        error,
      });
    }
  }
}
