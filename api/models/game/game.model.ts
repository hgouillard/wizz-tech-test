import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { GameAttributes, GameCreationAttributes } from './types';

export default (sequelize: Sequelize) => {
  class Game
    extends Model<GameAttributes, GameCreationAttributes>
    implements GameAttributes
  {
    public id!: number;
    public publisherId!: string;
    public name!: string;
    public platform!: string;
    public storeId!: string;
    public bundleId!: string;
    public appVersion!: string;
    public isPublished!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Game.init(
    {
      publisherId: DataTypes.STRING,
      name: DataTypes.STRING,
      platform: DataTypes.STRING,
      storeId: DataTypes.STRING,
      bundleId: DataTypes.STRING,
      appVersion: DataTypes.STRING,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Game',
    },
  );

  return Game;
};
