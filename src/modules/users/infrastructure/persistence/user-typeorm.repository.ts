import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserRepository,
  UserFilterType,
  UpdateUserType,
  CreateUserType,
} from '../../domain';
import { UserTypeOrmEntity } from './user-typeorm.entity';
import {
  FilteringType,
  PaginationType,
  SortingType,
  getOrderTypeOrmHelper,
  getWhereTypeOrmHelper,
} from '@ecommerce/common/helpers';
import { LoggerService } from '@ecommerce/common/logger';
import { PaginatedResourceType } from '@ecommerce/common/helpers';

export class UserTypeOrmRepository
  implements UserRepository<UserTypeOrmEntity>
{
  private readonly loggerContext = UserTypeOrmEntity.name;

  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly usersRepository: Repository<UserTypeOrmEntity>,
    private readonly logger: LoggerService,
  ) {}

  async findOneBy(fields: UserFilterType): Promise<UserTypeOrmEntity> {
    try {
      return await this.usersRepository.findOne({
        where: { ...fields },
      });
    } catch (error) {
      this.logger.error({ message: error, context: this.loggerContext });

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    pagination: PaginationType,
    sort: SortingType,
    filters: FilteringType[],
  ): Promise<PaginatedResourceType<Partial<UserTypeOrmEntity>>> {
    try {
      const { page, size } = pagination;
      const where = getWhereTypeOrmHelper(filters);
      const order = getOrderTypeOrmHelper(sort);

      const [users, count] = await this.usersRepository.findAndCount({
        where,
        order,
        skip: (page - 1) * size,
        take: size,
      });

      const lastPage = Math.ceil(count / size);

      return {
        total: count,
        current_page: page,
        last_page: lastPage,
        size,
        items: users,
      };
    } catch (error) {
      this.logger.error({ message: error, context: this.loggerContext });

      throw new InternalServerErrorException(error);
    }
  }

  async store(createUserFields: CreateUserType): Promise<UserTypeOrmEntity> {
    try {
      return this.usersRepository.create(createUserFields);
    } catch (error) {
      this.logger.error({ message: error, context: this.loggerContext });

      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateUserFields: UpdateUserType,
  ): Promise<UserTypeOrmEntity> {
    try {
      const user = await this.findOneBy({ id });

      return await this.usersRepository.save({ ...user, ...updateUserFields });
    } catch (error) {
      this.logger.error({ message: error, context: this.loggerContext });

      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<UserTypeOrmEntity> {
    try {
      const user = await this.findOneBy({ id });

      await this.usersRepository.remove(user);

      return { ...user, id };
    } catch (error) {
      this.logger.error({ message: error, context: this.loggerContext });

      throw new InternalServerErrorException(error);
    }
  }
}
