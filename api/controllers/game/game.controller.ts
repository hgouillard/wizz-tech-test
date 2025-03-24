import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../../infra/database/sequelize';
import { populateGames } from '../../services/game/game.service';
import { GameModel } from 'api/models/game/game.model';
const router = Router();

router.get('/', (_req: Request, res: Response) =>
  db.Game.findAll({ order: [['createdAt', 'DESC']] })
    .then((games: GameModel[]) => {
      return res.send(games.map((game) => game.toJSON()));
    })
    .catch((err: any) => {
      console.error('There was an error querying games', JSON.stringify(err));
      return res.send(err);
    }),
);

router.post('/', (req: Request, res: Response) => {
  const {
    publisherId,
    name,
    platform,
    storeId,
    bundleId,
    appVersion,
    isPublished,
  } = req.body;
  return db.Game.create({
    publisherId,
    name,
    platform,
    storeId,
    bundleId,
    appVersion,
    isPublished,
  })
    .then((game: GameModel) => res.send(game))
    .catch((err: any) => {
      console.error(
        '***There was an error creating a game',
        JSON.stringify(err),
      );
      return res.status(400).send(err);
    });
});

router.post('/search', (req: Request, res: Response) => {
  const { name, platform } = req.body;

  const whereClause: any = {};

  if (name) {
    whereClause.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (platform) {
    whereClause.platform = platform;
  }

  return db.Game.findAll({
    where: whereClause,
    order: [['createdAt', 'DESC']],
  })
    .then((games: GameModel[]) =>
      res.set('Content-Type', 'application/json').send(games),
    )
    .catch((err: any) => {
      console.error('There was an error searching games', JSON.stringify(err));
      return res.set('Content-Type', 'application/json').status(400).send(err);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  return db.Game.findByPk(id)
    .then((game: GameModel) => game?.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err: any) => {
      console.error('***Error deleting game', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  console.log('***Game', id);
  return db.Game.findOne({ where: { id } }).then((game: GameModel) => {
    console.log('***Game', game);
    if (!game) {
      throw new Error('Game not found');
    }
    const {
      publisherId,
      name,
      platform,
      storeId,
      bundleId,
      appVersion,
      isPublished,
    } = req.body;
    return game
      .update({
        publisherId,
        name,
        platform,
        storeId,
        bundleId,
        appVersion,
        isPublished,
      })
      .then(() => res.send(game))
      .catch((err: any) => {
        console.error('***Error updating game', JSON.stringify(err));
        return res.status(400).send(err);
      });
  });
});

router.post('/populate', async (_: Request, res: Response): Promise<void> => {
  try {
    const { statusCode, message, games } = await populateGames();
    res.status(statusCode).send({ message, games });
  } catch (err: unknown) {
    console.error('***Error populating games', JSON.stringify(err));
    res.status(500).send(err);
  }
});

export default router;
