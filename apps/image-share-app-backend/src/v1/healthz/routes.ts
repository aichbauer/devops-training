import healthz from '.';

export const healthzRoutes = {
  get: {
    healthz: {
      path: '/healthz',
      middleware: [],
      nextFunc: healthz,
    },
  },
};
