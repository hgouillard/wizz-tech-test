import request from 'supertest';
import assert from 'assert';
import { GameAttributes, GameCreateAttributes } from '../../models/game/types';
import app from '../../index';

/**
 * Testing create game endpoint
 */
describe('POST /api/games', () => {
  const data: GameCreateAttributes = {
    publisherId: '1234567890',
    name: 'Test App',
    platform: 'ios',
    storeId: '1234',
    bundleId: 'test.bundle.id',
    appVersion: '1.0.0',
    isPublished: true,
  };

  it('respond with 200 and an object that matches what we created', (done) => {
    request(app)
      .post('/api/games')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.strictEqual(result.body.publisherId, '1234567890');
        assert.strictEqual(result.body.name, 'Test App');
        assert.strictEqual(result.body.platform, 'ios');
        assert.strictEqual(result.body.storeId, '1234');
        assert.strictEqual(result.body.bundleId, 'test.bundle.id');
        assert.strictEqual(result.body.appVersion, '1.0.0');
        assert.strictEqual(result.body.isPublished, true);
        done();
      });
  });
});

/**
 * Testing get all games endpoint
 */
describe('GET /api/games', () => {
  it('respond with json containing a list that includes the game we just created', (done) => {
    request(app)
      .get('/api/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.strictEqual(result.body[0].publisherId, '1234567890');
        assert.strictEqual(result.body[0].name, 'Test App');
        assert.strictEqual(result.body[0].platform, 'ios');
        assert.strictEqual(result.body[0].storeId, '1234');
        assert.strictEqual(result.body[0].bundleId, 'test.bundle.id');
        assert.strictEqual(result.body[0].appVersion, '1.0.0');
        assert.strictEqual(result.body[0].isPublished, true);
        done();
      });
  });
  it('respond with json containing no games', (done) => {
    request(app)
      .get('/api/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.strictEqual(result.body.length, 0);
        done();
      });
  });
});

/**
 * Testing search games endpoint
 */
describe('POST /api/games/search', () => {
  it('should search games by name', (done) => {
    request(app)
      .post('/api/games/search')
      .send({ name: 'Test App' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.ok(Array.isArray(result.body));
        assert.ok(result.body.length > 0);
        assert.strictEqual(result.body[0].name, 'Test App');
        done();
      });
  });

  it('should search games by platform', (done) => {
    request(app)
      .post('/api/games/search')
      .send({ platform: 'ios' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.ok(Array.isArray(result.body));
        assert.ok(result.body.length > 0);
        assert.strictEqual(result.body[0].platform, 'ios');
        done();
      });
  });

  it('should search games by both name and platform', (done) => {
    request(app)
      .post('/api/games/search')
      .send({ name: 'Test App', platform: 'ios' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.ok(Array.isArray(result.body));
        assert.ok(result.body.length > 0);
        assert.strictEqual(result.body[0].name, 'Test App');
        assert.strictEqual(result.body[0].platform, 'ios');
        done();
      });
  });

  it('should return empty array when no matches found', (done) => {
    request(app)
      .post('/api/games/search')
      .send({ name: 'NonExistentGame' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.ok(Array.isArray(result.body));
        assert.strictEqual(result.body.length, 0);
        done();
      });
  });

  it('should return all games when no search criteria provided', (done) => {
    request(app)
      .post('/api/games/search')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.ok(Array.isArray(result.body));
        assert.ok(result.body.length > 0);
        done();
      });
  });
});

/**
 * Testing update game endpoint
 */
describe('PUT /api/games/:id', () => {
  const testGame: GameAttributes = {
    id: 1,
    publisherId: '999000999',
    name: 'Test App Updated',
    platform: 'android',
    storeId: '5678',
    bundleId: 'test.newBundle.id',
    appVersion: '1.0.1',
    isPublished: false,
  };

  it('respond with 200 and an updated object', (done) => {
    request(app)
      .put('/api/games/1')
      .send(testGame)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);
        assert.strictEqual(result.body.publisherId, '999000999');
        assert.strictEqual(result.body.name, 'Test App Updated');
        assert.strictEqual(result.body.platform, 'android');
        assert.strictEqual(result.body.storeId, '5678');
        assert.strictEqual(result.body.bundleId, 'test.newBundle.id');
        assert.strictEqual(result.body.appVersion, '1.0.1');
        assert.strictEqual(result.body.isPublished, false);
        done();
      });
  });
});

/**
 * Testing delete game endpoint
 */
describe('DELETE /api/games/1', () => {
  it('respond with 200', (done) => {
    request(app)
      .delete('/api/games/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/games/populate', () => {
  it('respond with 200 and populated games', (done) => {
    request(app)
      .post('/api/games/populate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, result) => {
        if (err) return done(err);

        // Vérifier que la réponse contient les champs attendus
        assert.ok(result.body.message);
        assert.ok(Array.isArray(result.body.games));
        assert.ok(result.body.games.length > 0);

        // Vérifier la structure d'un jeu
        const game = result.body.games[0];
        assert.ok(game.publisherId);
        assert.ok(game.name);
        assert.ok(['ios', 'android'].includes(game.platform));
        assert.ok(game.storeId);
        assert.ok(game.bundleId);
        assert.ok(game.appVersion);
        assert.ok(typeof game.isPublished === 'boolean');

        done();
      });
  });

  it('should handle errors gracefully', (done) => {
    // Simuler une erreur en modifiant l'URL de l'API
    const originalUrl = process.env.API_URL;
    process.env.API_URL = 'invalid-url';

    request(app)
      .post('/api/games/populate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, result) => {
        if (err) return done(err);

        // Restaurer l'URL originale
        process.env.API_URL = originalUrl;

        // Vérifier la structure de l'erreur
        assert.ok(result.body.error);
        assert.ok(result.body.details);
        done();
      });
  });
});
