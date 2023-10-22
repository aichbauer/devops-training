import { login, register, logout } from '.';

export const publicAuthRoutes = {
  post: {
    register: {
      path: '/register',
      middleware: [],
      nextFunc: register,
    },
    login: {
      path: '/login',
      middleware: [],
      nextFunc: login,
    },
  },
};

export const privateAuthRoutes = {
  delete: {
    logout: {
      path: '/logout',
      middleware: [],
      nextFunc: logout,
    },
  },
};
