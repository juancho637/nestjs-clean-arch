import { RolePresenter } from '@modules/roles/infrastructure';
import { UserType } from '../domain';

export class UserPresenter {
  id: number;
  name: string;
  email: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  roles?: RolePresenter[];

  constructor(user: Omit<UserType, 'password'>) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.created_at = user.createdAt;
    this.updated_at = user.updatedAt;
    user.roles &&
      (this.roles = user.roles.map((role) => new RolePresenter(role)));
  }
}
