import { StoreGame } from '../infra/datasource/storedata/types';
import { GameCreateAttributes } from '../models/game/types';

export function formatStoreGame(platform: 'ios' | 'android') {
  return function (game: StoreGame): GameCreateAttributes {
    return {
      publisherId: String(game.publisher_id),
      name: game.name,
      platform,
      storeId: String(game.app_id),
      bundleId: game.bundle_id,
      appVersion: game.version,
      isPublished: true,
    };
  };
}
