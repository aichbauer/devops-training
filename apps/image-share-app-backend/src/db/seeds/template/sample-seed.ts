import { Seed } from '../umzug';

export const up: Seed = async ({ context: sequelize }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sequelize.transaction(async (transaction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const queryInterface = sequelize.getQueryInterface();
    } catch (err) {
      console.error(err);

      throw new Error(err as string);
    }
  });
};

export const down: Seed = async ({ context: sequelize }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sequelize.transaction(async (transaction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const queryInterface = sequelize.getQueryInterface();
    } catch (err) {
      console.error(err);

      throw new Error(err as string);
    }
  });
};
