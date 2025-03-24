import { QueryInterface, WhereOptions, Op } from 'sequelize';

/* It is important to keep the current status of this interface if it changed further and migration must be reapplied*/
interface GameSeedData {
  publisherId: string;
  name: string;
  platform: string;
  storeId: string;
  bundleId: string;
  appVersion: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const gameData: GameSeedData[] = [
  {
    publisherId: 'fda4848f-9fe6-4703-8f66-544cc146f1ae',
    name: 'Helix Jump',
    platform: 'ios',
    storeId: '1345968745',
    bundleId: 'com.h8games.falldown',
    appVersion: '2.4.2',
    isPublished: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    publisherId: 'fda4848f-9fe6-4703-8f66-544cc146f1ae',
    name: 'Helix Jump',
    platform: 'android',
    storeId: 'com.h8games.helixjump',
    bundleId: 'com.h8games.helixjump',
    appVersion: '2.4.4',
    isPublished: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    publisherId: 'fda4848f-9fe6-4703-8f66-544cc146f1ae',
    name: 'Swing Rider',
    platform: 'ios',
    storeId: '1441881688',
    bundleId: 'com.semeevs.swingrider',
    appVersion: '1.3',
    isPublished: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    publisherId: 'fda4848f-9fe6-4703-8f66-544cc146f1ae',
    name: 'Swing Rider',
    platform: 'android',
    storeId: 'com.swing.rope',
    bundleId: 'com.swing.rope',
    appVersion: '1.0.3',
    isPublished: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    publisherId: 'c92d2e46-4f85-485c-b2a2-591d7857c93e',
    name: 'Car Crash!',
    platform: 'ios',
    storeId: '1450509345',
    bundleId: 'com.andrew.stunts',
    appVersion: '1.3.1',
    isPublished: true,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert('Games', gameData, {});
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    /*
     * I am not sure how the games are references by IDs so I use those three to ensure only inserted games are deleted
     * Maybe the storeId is enough to identify the game
     */
    const whereClause: WhereOptions = {
      [Op.or]: gameData.map((game) => ({
        publisherId: game.publisherId,
        storeId: game.storeId,
        appVersion: game.appVersion,
      })),
    };
    await queryInterface.bulkDelete('Games', whereClause, {});
  },
};
