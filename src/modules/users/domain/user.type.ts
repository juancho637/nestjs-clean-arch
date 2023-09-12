export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
