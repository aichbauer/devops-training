import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { audience, issuer, language } from '../../config/jwt';
import { User } from '../../db/models';
import auth from '../../services/auth';
import { hashPassword } from '../../services/password';
import { userRoles } from '../../services/userRoles';
import { requestParser } from '../helpers/requestParser';
import { errorResponse } from '../response/error';
import { successResponse } from '../response/success';
import { responseType } from './type';

export const register = async (req: Request, res: Response) => {
  const { user } = requestParser(req, 'user');

  try {
    if (user.password === user.confirmPassword) {
      const pass = await hashPassword(user.password);

      await User.create({
        ...user,
        role: userRoles.user,
        password: pass,
      });

      const foundUser = await User.findOne({
        where: {
          email: user.email,
        },
      });

      if (!foundUser) {
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
        statusCode: 201,
        data: [
          {
            user: foundUser,
            type: 'Bearer',
            token,
          },
        ],
      });
      return;
    }
  } catch (err) {
    console.error(err);
  }

  errorResponse({ res, type: responseType });
};
