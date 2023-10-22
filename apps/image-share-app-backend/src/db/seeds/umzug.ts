import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize/types';
import { SequelizeStorage, Umzug } from 'umzug';
import database from '../database';

export const seeder = new Umzug<Sequelize>({
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
      [filepath, fs.readFileSync(path.join(__dirname, 'template/sample-seed.ts')).toString()],
    ],
  },
});

export type Seed = typeof seeder._types.migration;
