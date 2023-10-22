import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import database from '../database';

export const migrator = new Umzug<Sequelize>({
  migrations: {
    glob: ['files/*.{ts,js}', { cwd: __dirname }],
  },
  context: database,
  storage: new SequelizeStorage({
    sequelize: database,
  }),
  logger: console,
  create: {
    folder: path.resolve(__dirname, 'files'),
    template: (filepath) => [
      // read template from filesystem
      [filepath, fs.readFileSync(path.join(__dirname, 'template/sample-migration.ts')).toString()],
    ],
  },
});

export type Migration = typeof migrator._types.migration;
