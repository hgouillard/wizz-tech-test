import axios from 'axios';
import { formatStoreGame } from '../../utils/game.util';
import { StoreGame } from '../../infra/datasource/storedata/types';
import db from '../../infra/database/sequelize';
import { GameAttributes } from '../../models/game/types';

export const populateGames = async (): Promise<{
  statusCode: number;
  message: string;
  games: GameAttributes[];
}> => {
  try {
    const [iosResponse, androidResponse] = await Promise.all([
      axios.get(
        'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json',
      ),
      axios.get(
        'https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json',
      ),
    ]);

    const iosGames: StoreGame[] = iosResponse.data
      .flat()
      .map((game: any) => formatStoreGame('ios')(game));

    const androidGames: StoreGame[] = androidResponse.data
      .flat()
      .map((game: any) => ({
        publisherId: String(game.publisher_id),
        name: game.humanized_name || game.name || '',
        platform: 'android' as const,
        storeId: game.app_id?.toString() || game.id?.toString() || '',
        bundleId: game.bundle_id || '',
        appVersion: game.version || '1.0.0',
        isPublished: true,
      }));

    const gamesToUpsert = [...iosGames, ...androidGames];
    const games = await db.Game.bulkCreate(gamesToUpsert, {
      ignoreDuplicates: true,
    });

    return {
      statusCode: 200,
      message: `Successfully populated database with ${games.length} games`,
      games,
    };
  } catch (err: any) {
    console.error('Error populating games:', JSON.stringify(err));
    throw {
      statusCode: 500,
      error: 'Failed to populate games',
      details: err.message,
    };
  }
};
