import { NextFunction, Request, Response } from 'express';
import { userRoles } from '../services/userRoles';
import { responseType } from '../v1/auth/type';
import { errorResponse } from '../v1/response/error';

export const adminAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { role } = req.payload;

  if (role === userRoles.admin) {
    next();
    return;
  }

  errorResponse({ res, type: responseType, statusCode: 403 });
};

export const allRolesAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // @ts-ignore
  const { role } = req.payload;

  if (role === userRoles.admin || role === userRoles.user) {
    next();
    return;
  }

  errorResponse({ res, type: responseType, statusCode: 403 });
};
