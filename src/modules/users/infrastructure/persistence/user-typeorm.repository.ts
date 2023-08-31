import { InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../domain/user.repository';
import { UserTypeOrmEntity } from './user-typeorm.entity';

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

  async findBy(where: any[]): Promise<UserTypeOrmEntity[]> {
    this.logger.error('error');
    throw new Error('Method not implemented.');
  }
  async findOneBy(where: any[]): Promise<UserTypeOrmEntity> {
    console.log('findOneBy', where);

    this.logger.error('error', UserTypeOrmRepository.name);
    throw new Error('Method not implemented.');
  }
  async findAll(options: any[]): Promise<UserTypeOrmEntity[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  async create(user: UserTypeOrmEntity): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
  async update(
    id: number,
    user: UserTypeOrmEntity,
  ): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
  async delete(id: number): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
}
