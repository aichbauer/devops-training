import express from 'express';
import { HTTPMethodsLowerCase } from '../middleware/authentication';
import { publicAuthRoutes } from './auth/routes';
import { healthzRoutes } from './healthz/routes';

const publicRoutes = {
  get: {
    ...healthzRoutes.get,
  },
  post: {
    ...publicAuthRoutes.post,
  },
  put: {},
  delete: {},
};

const publicRouter = express.Router();

Object.entries(publicRoutes).forEach((routesMeta) => {
  const method = routesMeta[0] as HTTPMethodsLowerCase;
  const routes = routesMeta[1];

  Object.entries(routes).forEach((routeMeta) => {
    const route = routeMeta[1];

    const middleware = Array.isArray(route.middleware) ? route.middleware : [];

    publicRouter[method](route.path, middleware, route.nextFunc);
  });
});

export default publicRouter;
