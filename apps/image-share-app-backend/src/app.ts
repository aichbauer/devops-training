import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { authMiddleware } from './middleware/authentication';
import { errorResponse } from './v1/response/error';
import privateRouter from './v1/privateRouter';
import publicRouter from './v1/publicRouter';
import DatabaseService from './db';
import { initAssociations } from './db/models';
import { responseType } from './v1/auth/type';
import { ABSOLUTE_IMAGE_PATH } from './config/uploadPaths';

initAssociations();

const getApp = async () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.APP_URL!,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: false, limit: '1000mb' }));
  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use('/static/images', express.static(ABSOLUTE_IMAGE_PATH));
  app.use('/api/public/v1', publicRouter);
  app.use('/api/v1', [authMiddleware], privateRouter);
  app.use((_, res) => {
    // Todo: logging!!
    console.error('NOT FOUND');
    errorResponse({ res, type: responseType });
  });

  return app;
};

export default {
  getApp,
  DatabaseService,
};
