import express from 'express';
import { HTTPMethodsLowerCase } from '../middleware/authentication';
import { privateAuthRoutes } from './auth/routes';
import { healthzRoutes } from './healthz/routes';
import { imageRoutes } from './image/routes';
import { userRoutes } from './users/routes';

const privateRoutes = {
  get: {
    ...imageRoutes.get,
    ...healthzRoutes.get,
    ...userRoutes.get,
  },
  post: {
    ...imageRoutes.post,
    ...userRoutes.post,
  },
  put: {
    ...imageRoutes.put,
    ...userRoutes.put,
  },
  delete: {
    ...imageRoutes.delete,
    ...userRoutes.delete,
    ...privateAuthRoutes.delete,
  },
};

const privateRouter = express.Router();

Object.entries(privateRoutes).forEach((routesMeta) => {
  const method = routesMeta[0] as HTTPMethodsLowerCase;
  const routes = routesMeta[1];

  Object.entries(routes).forEach((routeMeta) => {
    const route = routeMeta[1];

    const middleware = Array.isArray(route.middleware) ? route.middleware : [];

    privateRouter[method](route.path, middleware, route.nextFunc);
  });
});

export default privateRouter;
