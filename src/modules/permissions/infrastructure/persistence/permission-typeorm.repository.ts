import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  getOrderTypeOrmHelper,
  getWhereTypeOrmHelper,
} from '@common/helpers/infrastructure';
import {
  FindAllFieldsDto,
  PaginatedResourceType,
} from '@common/helpers/domain';
import {
  LoggerProvidersEnum,
  LoggerServiceInterface,
} from '@common/adapters/logger/domain';
import {
  ExceptionProvidersEnum,
  ExceptionServiceInterface,
} from '@common/adapters/exception/domain';
import {
  PermissionRepositoryInterface,
  PermissionFilterType,
  permissionErrorsCodes,
  CreatePermissionType,
} from '../../domain';
import { PermissionEntity } from './permission.entity';

export class PermissionTypeOrmRepository
  implements PermissionRepositoryInterface<PermissionEntity>
{
  private readonly context = PermissionTypeOrmRepository.name;

  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionsRepository: Repository<PermissionEntity>,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    private readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async findOneBy(fields: PermissionFilterType): Promise<PermissionEntity> {
    try {
      const Permission = await this.permissionsRepository.findOneOrFail({
        where: { ...fields },
      });

      return Permission;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM010,
        context: this.context,
        error,
      });
    }
  }

  async findByIds(ids: number[]): Promise<PermissionEntity[]> {
    try {
      const Permission = await this.permissionsRepository.find({
        where: { id: In(ids) },
      });

      return Permission;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM010,
        context: this.context,
        error,
      });
    }
  }

  async findAll({
    pagination,
    sort,
    filters,
    relations,
  }: FindAllFieldsDto<PermissionFilterType> = {}): Promise<
    PaginatedResourceType<PermissionEntity>
  > {
    try {
      const where = getWhereTypeOrmHelper<PermissionFilterType>(filters);
      const order = getOrderTypeOrmHelper<PermissionFilterType>(sort);

      const { page = 1, size } = pagination || {};

      const skip = size && (page - 1) * size;

      const [permissions, count] =
        await this.permissionsRepository.findAndCount({
          where,
          order,
          relations,
          skip,
          take: size,
        });

      const lastPage = size ? Math.ceil(count / size) : 1;

      return {
        total: count,
        currentPage: page,
        lastPage,
        size: size || count,
        items: permissions,
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM020,
        context: this.context,
        error,
      });
    }
  }

  async store(
    createPermissionsFields: CreatePermissionType | CreatePermissionType[],
  ): Promise<PermissionEntity | PermissionEntity[]> {
    try {
      if (Array.isArray(createPermissionsFields)) {
        return this.permissionsRepository.save(createPermissionsFields);
      }

      return this.permissionsRepository.save(createPermissionsFields);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: permissionErrorsCodes.PRM030,
        context: this.context,
        error,
      });
    }
  }
}
