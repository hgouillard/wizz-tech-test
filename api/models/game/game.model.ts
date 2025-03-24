import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { GameAttributes, GameCreateAttributes } from './types';

export class GameModel extends Model<GameAttributes, GameCreateAttributes> {
  public id!: number;
  public publisherId!: string;
  public name!: string;
  public platform!: 'ios' | 'android';
  public storeId!: string;
  public bundleId!: string;
}

export default (sequelize: Sequelize) => {
  class Game extends GameModel implements GameAttributes {
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
