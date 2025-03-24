import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { DatabaseConfig, DbInterface } from './types';
import DATABASE_CONFIG from './config/datasource.config.json';

const env = process.env.NODE_ENV || 'development';
const config = DATABASE_CONFIG[
  env as keyof typeof DATABASE_CONFIG
] as DatabaseConfig;

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] || '', config);
} else {
  sequelize = new Sequelize(
    config.database ?? 'db',
    config.username ?? 'user',
    config.password ?? 'password',
    config,
  );
}

const db: DbInterface = {
  sequelize,
};

// Charger les modèles depuis le dossier api/models
const modelsPath = path.join(__dirname, '../../models');
const modelFolders = fs.readdirSync(modelsPath);

for (const folder of modelFolders) {
  const modelFiles = fs
    .readdirSync(path.join(modelsPath, folder))
    .filter((file) => file.endsWith('.model.ts'));

  for (const file of modelFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(modelsPath, folder, file)).default(
      sequelize,
    );
    db[model.name] = model;
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
