import { copyFileSync, mkdirSync, rmSync } from 'fs';
import { v4 as uuid } from 'uuid';

import path from 'path';
import { cwd } from 'process';
import { Seed } from '../umzug';
import {
  ABSOLUTE_TEMPORARY_IMAGE_PATH,
  ABSOLUTE_USER_UPLOADS_IMAGE_PATH,
  ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL,
} from '../../../config/uploadPaths';
import { hashPassword } from '../../../services/password';

const admin = {
  id: 'da632926-5b57-48f5-921d-b33abf59b46c',
  email: 'admin@admin.admin',
  user_name: 'admin',
  first_name: 'admin',
  last_name: 'admin',
  password: '1234',
  role: 'admin',
};

const user = {
  id: 'd2842c0d-973a-4650-bf55-22565ff62d21',
  email: 'user@user.user',
  user_name: 'user',
  first_name: 'user',
  last_name: 'user',
  password: '1234',
  role: 'user',
};

const initialUsers = [admin, user];

const baseSeedPath = path.join(cwd(), 'src', 'db', 'seeds', 'images');
const baseImagePath = (userId: string) => path.join(cwd(), 'src', 'images', 'user-uploads', userId);

export const up: Seed = async ({ context: sequelize }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sequelize.transaction(async (transaction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mkdirSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, {
        recursive: true,
      });
      mkdirSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, {
        recursive: true,
      });

      const queryInterface = sequelize.getQueryInterface();

      for (let i = 0; i < initialUsers.length; i += 1) {
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        const hashedPW = await hashPassword(initialUsers[i].password);
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await queryInterface.insert(
          null,
          'users',
          {
            ...initialUsers[i],
            password: hashedPW,
          },
          {
            transaction,
          },
        );

        const id1 = uuid();
        const id2 = uuid();
        const id3 = uuid();

        const userImageSeedPath1 = path.join(baseSeedPath, `${i === 0 ? 0 : 1}.jpg`);
        const userImageSeedPath2 = path.join(baseSeedPath, `${i === 0 ? 2 : 3}.jpg`);
        const userImageSeedPath3 = path.join(baseSeedPath, `${i === 0 ? 4 : 5}.jpg`);
        const userImagePath1 = path.join(baseImagePath(initialUsers[i].id), `${id1}.jpg`);
        const userImagePath2 = path.join(baseImagePath(initialUsers[i].id), `${id2}.jpg`);
        const userImagePath3 = path.join(baseImagePath(initialUsers[i].id), `${id3}.jpg`);

        mkdirSync(baseImagePath(initialUsers[i].id), { recursive: true });

        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await queryInterface.insert(
          null,
          'images',
          {
            id: id1,
            path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${initialUsers[i].id}/${id1}.jpg`,
            user_id: initialUsers[i].id,
          },
          {
            transaction,
          },
        );
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await queryInterface.insert(
          null,
          'images',
          {
            id: id2,
            path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${initialUsers[i].id}/${id2}.jpg`,
            user_id: initialUsers[i].id,
          },
          {
            transaction,
          },
        );
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await queryInterface.insert(
          null,
          'images',
          {
            id: id3,
            path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${initialUsers[i].id}/${id3}.jpg`,
            user_id: initialUsers[i].id,
          },
          {
            transaction,
          },
        );

        copyFileSync(path.join(userImageSeedPath1), path.join(userImagePath1));
        copyFileSync(path.join(userImageSeedPath2), path.join(userImagePath2));
        copyFileSync(path.join(userImageSeedPath3), path.join(userImagePath3));
      }
    } catch (err) {
      console.error(err);

      rmSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, {
        recursive: true,
        force: true,
      });
      rmSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, {
        recursive: true,
        force: true,
      });
      rmSync(baseImagePath(initialUsers[0].id), {
        recursive: true,
        force: true,
      });
      rmSync(baseImagePath(initialUsers[1].id), {
        recursive: true,
        force: true,
      });

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

      await queryInterface.bulkDelete(
        'images',
        {
          user_id: initialUsers.map((initalUser) => initalUser.id),
        },
        {
          transaction,
        },
      );
      await queryInterface.bulkDelete(
        'users',
        {
          id: initialUsers.map((initalUser) => initalUser.id),
        },
        {
          transaction,
        },
      );

      rmSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, {
        recursive: true,
        force: true,
      });
      rmSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, {
        recursive: true,
        force: true,
      });
      rmSync(baseImagePath(initialUsers[0].id), {
        recursive: true,
        force: true,
      });
      rmSync(baseImagePath(initialUsers[1].id), {
        recursive: true,
        force: true,
      });
    } catch (err) {
      console.error(err);

      throw new Error(err as string);
    }
  });
};
