import { Request, Response } from 'express';
import { User } from '../../db/models';
import { requestParser } from '../helpers/requestParser';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const read = async (req: Request, res: Response) => {
  const { userId, payload } = requestParser(req);
  const myUserId = req.path.includes('/users/me/') ? payload.userId : userId;

  try {
    if (myUserId) {
      const foundUser = await User.findOne({
        where: {
          id: myUserId,
        },
      });

      if (!foundUser) {
        errorResponse({ res, type: responseType, statusCode: 404 });
        return;
      }

      successResponse({
        res,
        type: responseType,
        statusCode: 200,
        data: [foundUser],
      });
      return;
    }

    const foundUsers = await User.findAll();

    if (Array.isArray(foundUsers) && foundUsers.length === 0) {
      errorResponse({ res, type: responseType, statusCode: 404 });
      return;
    }

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: foundUsers,
    });
  } catch (err) {
    console.error(err);
    errorResponse({ res, type: responseType });
  }
};
