import { Request, Response } from 'express';
import { User } from '../../db/models';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { requestParser } from '../helpers/requestParser';
import { responseType } from './type';

export const logout = async (req: Request, res: Response) => {
  const { userId } = requestParser(req, 'user');

  try {
    const foundUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      errorResponse({ res, type: responseType });
      return;
    }

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: [
        {
          id: userId,
        },
      ],
    });
    return;
  } catch (err) {
    console.error(err);
  }

  errorResponse({ res, type: responseType });
};
