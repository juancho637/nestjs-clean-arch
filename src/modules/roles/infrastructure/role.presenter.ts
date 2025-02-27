import { RoleType } from '../domain';

export class RolePresenter {
  id: number;
  name: string;
  status: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor(role: RoleType) {
    this.id = role.id;
    this.name = role.name;
    this.status = role.status;
    this.description = role.description;
    this.created_at = role.createdAt;
    this.updated_at = role.updatedAt;
  }
}
