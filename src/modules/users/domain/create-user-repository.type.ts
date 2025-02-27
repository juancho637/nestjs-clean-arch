import { UserType } from './user.type';

export type CreateUserRepositoryType = Omit<
  UserType,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
