import { PermissionType } from '../domain';

export class PermissionPresenter {
  id: number;
  name: string;
  module: string;

  constructor(user: Partial<PermissionType>) {
    this.id = user.id;
    this.name = user.name;
    this.module = user.module;
  }
}
