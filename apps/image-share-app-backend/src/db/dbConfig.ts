import fs from 'fs';
import dotenvFlow from 'dotenv-flow';
import { Options } from 'sequelize/types';
import { join } from 'path';

dotenvFlow.config();
type RequiredOptions = Required<
  Pick<Options, 'username' | 'password' | 'database' | 'host' | 'port' | 'dialect'>
> &
  Options;
const baseConfig: RequiredOptions = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT || 5431),
  dialect: 'postgres',
  ssl: true,
  ...(process.env.NODE_ENV === 'production' && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: fs.readFileSync(join(__dirname, 'certs', 'BaltimoreCyberTrustRoot.crt.pem')),
      },
    },
  }),
};

const dbConfig: Record<'test' | 'development' | 'production', RequiredOptions> = {
  development: baseConfig,
  production: baseConfig,
  test: {
    database: 'root',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: Number(process.env.DB_PORT || 5431),
    dialect: 'postgres',
  },
};

export default dbConfig;
