import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import {
  UpdateRoleType,
  RoleRepositoryInterface,
  RoleType,
  roleErrorsCodes,
} from '../domain';

export class UpdateRoleUseCase {
  private readonly context = UpdateRoleUseCase.name;

  constructor(
    private readonly roleRepository: RoleRepositoryInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(id: number, updateRoleFields: UpdateRoleType): Promise<RoleType> {
    try {
      const role = await this.roleRepository.update(id, updateRoleFields);

      return role;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: roleErrorsCodes.ROL041,
        context: this.context,
        error,
      });
    }
  }
}
