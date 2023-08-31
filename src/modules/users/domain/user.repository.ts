import { UserType } from './user.type';

export interface UserRepository<Entity extends UserType = UserType> {
  findBy(where: any[]): Promise<Entity[]>;
  findOneBy(where: any[]): Promise<Entity>;
  findAll(options?: any[]): Promise<Entity[]>;
  create(user: Entity): Promise<Entity>;
  update(id: number, user: Entity): Promise<Entity>;
  delete(id: number): Promise<Entity>;
}
