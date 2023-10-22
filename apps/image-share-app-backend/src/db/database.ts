import { Sequelize } from 'sequelize';
import { Client } from 'pg';
import dbConfig from './dbConfig';
import { NodeEnv } from '../config/constants';

const NODE_ENV = (process.env.NODE_ENV as NodeEnv) || 'development';

if (NODE_ENV === 'development') {
  const client = new Client({
    host: dbConfig[NODE_ENV].host,
    port: dbConfig[NODE_ENV].port,
    user: dbConfig[NODE_ENV].username,
    password: dbConfig[NODE_ENV].password,
  });

  client.connect();
  client.query(
    `SELECT 1 as result FROM pg_database WHERE datname = '${dbConfig[NODE_ENV].database}';`,
    (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (data?.rows?.[0]?.result === 1) {
        console.info('Database already exists!');
        client.end();
      } else {
        client.query(`CREATE DATABASE ${dbConfig[NODE_ENV].database};`, (err2) => {
          if (err2) {
            console.error(err2);
            process.exit(1);
          }

          client.query(
            `GRANT ALL PRIVILEGES ON DATABASE ${dbConfig[NODE_ENV].database} TO ${dbConfig[NODE_ENV].username};`,
            (err3) => {
              if (err3) {
                console.error(err3);
                process.exit(1);
              }
              console.info('Database successfully created!');
              client.end();
            },
          );
        });
      }
    },
  );
}

const database = new Sequelize(
  dbConfig[NODE_ENV].database,
  dbConfig[NODE_ENV].username,
  dbConfig[NODE_ENV].password,
  {
    host: dbConfig[NODE_ENV].host,
    port: dbConfig[NODE_ENV].port,
    dialect: dbConfig[NODE_ENV].dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      ...dbConfig[NODE_ENV].dialectOptions,
      charset: 'utf8',
    },
    logging: false,
  },
);

export default database;
