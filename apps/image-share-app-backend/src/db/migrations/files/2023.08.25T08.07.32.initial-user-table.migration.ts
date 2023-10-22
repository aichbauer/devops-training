import { DataTypes, UUIDV4 } from 'sequelize';
import { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sequelize.transaction(async (transaction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const queryInterface = sequelize.getQueryInterface();

      await queryInterface.createTable(
        'users',
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
          role: {
            type: DataTypes.TEXT,
          },
          user_name: {
            type: DataTypes.TEXT,
          },
          first_name: {
            type: DataTypes.TEXT,
          },
          last_name: {
            type: DataTypes.TEXT,
          },
          email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          created_at: {
            type: DataTypes.DATE,
          },
          created_by: {
            type: DataTypes.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'cascade',
          },
          last_updated_at: {
            type: DataTypes.DATE,
          },
          last_updated_by: {
            type: DataTypes.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'cascade',
          },
          deleted_at: {
            type: DataTypes.DATE,
          },
          deleted_by: {
            type: DataTypes.UUID,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'cascade',
          },
        },
        {
          transaction,
        },
      );
    } catch (err) {
      console.error(err);

      throw new Error(err as string);
    }
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sequelize.transaction(async (transaction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const queryInterface = sequelize.getQueryInterface();

      await queryInterface.dropTable('users', {
        transaction,
      });
    } catch (err) {
      console.error(err);

      throw new Error(err as string);
    }
  });
};
