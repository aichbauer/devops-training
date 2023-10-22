import { Request, Response } from 'express';
import { existsSync, rmSync } from 'fs';
import path from 'path';
import { ABSOLUTE_USER_UPLOADS_IMAGE_PATH } from '../../config/uploadPaths';
import { Image } from '../../db/models';
import { requestParser } from '../helpers/requestParser';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const destroy = async (req: Request, res: Response) => {
  const { imageId, payload } = requestParser(req, 'image');

  try {
    const absolutePathToUserImages = path.join(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, payload.userId);

    const foundImage = await Image.findOne({
      where: {
        id: imageId,
        userId: payload.userId,
      },
    });
    await Image.destroy({
      where: {
        id: imageId,
        userId: payload.userId,
      },
    });

    if (existsSync(path.join(absolutePathToUserImages, `${foundImage?.getDataValue('id')}.jpg`))) {
      rmSync(path.join(absolutePathToUserImages, `${foundImage?.getDataValue('id')}.jpg`));
    }

    successResponse({
      res,
      statusCode: 200,
      type: responseType,
      message: 'Image successfully destroyed',
      data: [
        {
          id: imageId,
        },
      ],
    });
  } catch (err) {
    errorResponse({
      res,
      type: responseType,
    });
  }
};
