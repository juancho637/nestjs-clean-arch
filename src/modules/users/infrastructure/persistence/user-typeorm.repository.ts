import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  getOrderTypeOrmHelper,
  getWhereTypeOrmHelper,
} from '@common/helpers/infrastructure';
import {
  FilterRuleEnum,
  FindAllFieldsDto,
  FindOneByFieldsDto,
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
  UserRepositoryInterface,
  UserFilterType,
  // UpdateUserType,
  userErrorsCodes,
  UpdateUserType,
  CreateUserRepositoryType,
} from '../../domain';
import { UserEntity } from './user.entity';

export class UserTypeOrmRepository
  implements UserRepositoryInterface<UserEntity>
{
  private readonly context = UserTypeOrmRepository.name;

  constructor(
    @InjectRepository(UserEntity)
    readonly usersRepository: Repository<UserEntity>,
    @Inject(LoggerProvidersEnum.LOGGER_SERVICE)
    readonly logger: LoggerServiceInterface,
    @Inject(ExceptionProvidersEnum.EXCEPTION_SERVICE)
    readonly exception: ExceptionServiceInterface,
  ) {}

  async findOneBy({
    filter,
    relations,
  }: FindOneByFieldsDto<UserFilterType>): Promise<UserEntity> {
    try {
      const where = getWhereTypeOrmHelper<UserFilterType>(filter);

      const user = await this.usersRepository.findOne({
        where,
        relations: relations || [],
      });

      return user;
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM010,
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
  }: FindAllFieldsDto<UserFilterType> = {}): Promise<
    PaginatedResourceType<UserEntity>
  > {
    try {
      const where = getWhereTypeOrmHelper<UserFilterType>(filters);
      const order = getOrderTypeOrmHelper<UserFilterType>(sort);

      const { page = 1, size } = pagination || {};

      const skip = size && (page - 1) * size;

      const [users, count] = await this.usersRepository.findAndCount({
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
        items: users,
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM020,
        context: this.context,
        error,
      });
    }
  }

  async store(
    createUserFields: CreateUserRepositoryType | CreateUserRepositoryType[],
  ): Promise<UserEntity | UserEntity[]> {
    try {
      if (Array.isArray(createUserFields)) {
        return await this.usersRepository.save(createUserFields);
      }

      return await this.usersRepository.save(createUserFields);
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM030,
        context: this.context,
        error,
      });
    }
  }

  async update(
    id: number,
    updateUserFields: UpdateUserType,
  ): Promise<UserEntity> {
    try {
      const user = await this.findOneBy({
        filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
      });

      return await this.usersRepository.save({ ...user, ...updateUserFields });
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM040,
        context: this.context,
        error,
      });
    }
  }

  async delete(id: number): Promise<UserEntity> {
    try {
      const user = await this.findOneBy({
        filter: { property: 'id', rule: FilterRuleEnum.EQUALS, value: id },
      });

      await this.usersRepository.softRemove(user);

      return { ...user, id };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: userErrorsCodes.UM050,
        context: this.context,
        error,
      });
    }
  }
}
