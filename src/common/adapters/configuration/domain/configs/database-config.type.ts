export type DataBaseConfigType = {
  type: DatabasesTypes;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type DatabasesTypes = 'sqlite' | 'postgres';
