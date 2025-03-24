import { Sequelize } from 'sequelize';

export type DatabaseConfig = {
  dialect: 'sqlite';
  storage: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  use_env_variable?: string;
};

export interface DbInterface {
  [key: string]: any;
  sequelize: Sequelize;
}
