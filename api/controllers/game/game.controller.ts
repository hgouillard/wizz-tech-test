import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../../infra/database/sequelize';

const router = Router();

router.get('/', (_req: Request, res: Response) =>
  db.Game.findAll()
    .then((games: any) => {
      return res.send(games);
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
    .then((game: any) => res.send(game))
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

  return db.Game.findAll({ where: whereClause })
    .then((games: any) => res.send(games))
    .catch((err: any) => {
      console.error('There was an error searching games', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  return db.Game.findByPk(id)
    .then((game: any) => game?.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err: any) => {
      console.error('***Error deleting game', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  return db.Game.findByPk(id).then((game: any) => {
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

export default router;
