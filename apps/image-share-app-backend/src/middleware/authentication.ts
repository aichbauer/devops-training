import { NextFunction, Request, Response } from 'express';
import { jwtSecret } from '../config/jwt';
import auth from '../services/auth';
import { responseType } from '../v1/auth/type';
import { errorResponse } from '../v1/response/error';

export type HTTPMethods = 'POST' | 'PUT' | 'GET' | 'DELETE';
export type HTTPMethodsLowerCase = 'post' | 'put' | 'get' | 'delete';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || 'x.y.z';

  try {
    const payload = await auth.verifyAccessToken(token, jwtSecret);

    if (payload.valid) {
      // @ts-ignore
      req.payload = payload;
      next();
      return;
    }
  } catch {
    // no-op
  }

  errorResponse({ res, type: responseType, statusCode: 401 });
};
