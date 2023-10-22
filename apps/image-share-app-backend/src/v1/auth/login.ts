import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../db/models';
import auth from '../../services/auth';
import { isValidPassword } from '../../services/password';
import { audience, issuer, language } from '../../config/jwt';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { requestParser } from '../helpers/requestParser';
import { responseType } from './type';

export const login = async (req: Request, res: Response) => {
  const { user } = requestParser(req, 'user');

  if (!user.email || !user.password) {
    errorResponse({ res, type: responseType });
    return;
  }

  try {
    const foundUser = await User.scope('withPassword').findOne({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      errorResponse({ res, type: responseType });
      return;
    }

    const isPasswordValid = await isValidPassword(
      user.password,
      foundUser.getDataValue('password')?.trim() || '',
    );

    if (!isPasswordValid) {
      errorResponse({ res, type: responseType });
      return;
    }

    const token = await auth.signAccessToken({
      rle: foundUser.getDataValue('role') || '',
      iss: issuer,
      sub: foundUser.getDataValue('id') || '',
      aud: audience,
      lng: language,
      jti: uuidv4(),
      nonce: uuidv4(),
      auth_time: new Date().getUTCMilliseconds(),
    });

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: [
        {
          type: 'Bearer',
          token,
          user: foundUser,
        },
      ],
    });
    return;
  } catch (err) {
    console.error(err);
  }

  errorResponse({ res, type: responseType });
};
