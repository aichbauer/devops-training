import { Request, Response } from 'express';
import { existsSync, mkdirSync, promises } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import {
  ABSOLUTE_TEMPORARY_IMAGE_PATH,
  ABSOLUTE_USER_UPLOADS_IMAGE_PATH,
  ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL,
} from '../../config/uploadPaths';
import { Image } from '../../db/models';
import { getExtensionFromMimeType } from '../../services/getExtensionFromMimeType';
import { requestParser } from '../helpers/requestParser';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const upload = async (req: Request, res: Response) => {
  const { userId, images } = requestParser(req, 'user');

  const absolutePathToUserImages = path.join(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, userId);
  try {
    if (!existsSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH)) {
      mkdirSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true });
    }
    if (!existsSync(ABSOLUTE_TEMPORARY_IMAGE_PATH)) {
      mkdirSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true });
    }
    if (!existsSync(absolutePathToUserImages)) {
      mkdirSync(absolutePathToUserImages);
    }

    let error = false;

    for (let i = 0; i < images.length; i += 1) {
      const extension = getExtensionFromMimeType(images[i].mimetype);
      const UUID = uuid();
      const filename = `${UUID}.${extension}`;
      try {
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await promises.rename(
          path.join(`${images[i].path}`),
          path.join(absolutePathToUserImages, filename),
        );
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
        await Image.create({
          id: UUID,
          path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${userId}/${filename}`,
          userId,
        });
      } catch (err) {
        console.error(err);
        error = true;
      }

      if (error) {
        break;
      }
    }

    const userImages = await Image.findAll({
      where: {
        userId,
      },
    });

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: userImages,
    });
  } catch (err) {
    errorResponse({
      res,
      type: responseType,
    });
  }
};
