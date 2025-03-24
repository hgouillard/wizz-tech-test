import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      publisherId: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.STRING,
      },
      storeId: {
        type: DataTypes.STRING,
      },
      bundleId: {
        type: DataTypes.STRING,
      },
      appVersion: {
        type: DataTypes.STRING,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('Games');
  },
};
