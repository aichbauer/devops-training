import { Request, Response } from 'express';
import { successResponse } from '../response/success';
import { errorResponse } from '../response/error';
import { responseType } from './type';
import database from '../../db/database';

const healthz = async (_: Request, res: Response) => {
  try {
    await database.authenticate();

    successResponse({
      res,
      type: responseType,
      statusCode: 200,
      data: [
        {
          random: (Math.random() + 1).toString(36).substring(7),
          environment: process.env.NODE_ENV,
          hostname: process.env.HOSTNAME,
        },
      ],
    });
  } catch (err) {
    console.error(err);

    errorResponse({
      res,
      type: responseType,
      statusCode: 400,
      data: [
        {
          random: (Math.random() + 1).toString(36).substring(7),
          environment: process.env.NODE_ENV,
          hostname: process.env.HOSTNAME,
        },
      ],
    });
  }
};

export default healthz;
