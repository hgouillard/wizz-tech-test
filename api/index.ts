import express from 'express';
import bodyParser from 'body-parser';
import gameRoutes from './controllers/game/game.controller';

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/static`));

// Controllers/routers
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

export default app;
