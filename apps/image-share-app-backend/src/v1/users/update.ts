import { Request, Response } from 'express';
import { User } from '../../db/models';
import { requestParser } from '../helpers/requestParser';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const update = async (req: Request, res: Response) => {
  const { user, userId, payload } = requestParser(req, 'user');
  const myUserId = req.path.includes('/users/me/') ? payload.userId : userId;

  try {
    await User.update(
      {
        ...user,
        id: myUserId,
      },
      {
        where: {
          id: myUserId,
        },
      },
    );

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: [
        {
          id: myUserId,
        },
      ],
    });
  } catch (err) {
    console.error(err);
    errorResponse({ res, type: responseType });
  }
};
