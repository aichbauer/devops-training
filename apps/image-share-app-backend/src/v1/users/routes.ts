import users from '.';
import {
  adminAuthorizationMiddleware,
  allRolesAuthorizationMiddleware,
} from '../../middleware/authorization';
import { adminRole, allRoles } from '../../services/userRoles';

export const userRoutes = {
  post: {},
  get: {
    readMe: {
      path: '/users/me',
      access: allRoles,
      middleware: [allRolesAuthorizationMiddleware],
      nextFunc: users.read,
    },
    readUserById: {
      path: '/users/:userId?',
      access: adminRole,
      middleware: [adminAuthorizationMiddleware],
      nextFunc: users.read,
    },
  },
  put: {
    readMe: {
      path: '/users/me',
      access: allRoles,
      middleware: [allRolesAuthorizationMiddleware],
      nextFunc: users.update,
    },
    readUserById: {
      path: '/users/:userId',
      access: adminRole,
      middleware: [adminAuthorizationMiddleware],
      nextFunc: users.update,
    },
  },
  delete: {
    destoryMe: {
      path: '/users/me',
      access: allRoles,
      middleware: [allRolesAuthorizationMiddleware],
      nextFunc: users.destroy,
    },
    destroyUserById: {
      path: '/users/:userId',
      access: adminRole,
      middleware: [adminAuthorizationMiddleware],
      nextFunc: users.destroy,
    },
  },
};
