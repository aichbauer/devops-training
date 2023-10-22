import database from './database';

const DatabaseService = {
  start: async () => {
    try {
      await database.authenticate();

      console.info('Connection to the database has been established successfully!');
    } catch (err) {
      console.error('Unable to connect to the database: ', err);
    }
  },
  close: async () => database.close(),
};

export default DatabaseService;
