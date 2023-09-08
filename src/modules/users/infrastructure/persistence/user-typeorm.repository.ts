import { InternalServerErrorException, Logger } from '@nestjs/common';
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

export class UserTypeOrmRepository
  implements UserRepository<UserTypeOrmEntity>
{
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly usersRepository: Repository<UserTypeOrmEntity>,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(UserTypeOrmRepository.name);
  }

  async findOneBy(fields: UserFilterType): Promise<UserTypeOrmEntity> {
    try {
      return await this.usersRepository.findOne({
        where: { ...fields },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    pagination: PaginationType,
    sort: SortingType,
    filters: FilteringType[],
  ): Promise<UserTypeOrmEntity[]> {
    try {
      const { page, size } = pagination;
      const where = getWhereTypeOrmHelper(filters);
      const order = getOrderTypeOrmHelper(sort);

      return await this.usersRepository.find({
        where,
        order,
        skip: (page - 1) * size,
        take: size,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async store(createUserFields: CreateUserType): Promise<UserTypeOrmEntity> {
    try {
      return this.usersRepository.create(createUserFields);
    } catch (error) {
      this.logger.error(error);
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
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<UserTypeOrmEntity> {
    try {
      const user = await this.findOneBy({ id });

      await this.usersRepository.remove(user);

      return { ...user, id };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
