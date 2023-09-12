import { UserType } from '../domain';

export class UserPresenter {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: Partial<UserType>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.createdAt;
    this.updated_at = user.updatedAt;
  }
}
