import { UserRepository, UserTypeOrmEntity } from '@ecommerce/modules/users';

export class UserTypeOrmRepository
  implements UserRepository<UserTypeOrmEntity>
{
  findBy(...where: any[]): Promise<UserTypeOrmEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneBy(...where: any[]): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(...options: any[]): Promise<UserTypeOrmEntity[]> {
    throw new Error('Method not implemented.');
  }
  create(user: UserTypeOrmEntity): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: number, user: UserTypeOrmEntity): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<UserTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }
}
