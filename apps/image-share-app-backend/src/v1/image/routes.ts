import { upload, destroy, read } from '.';
import { allRolesAuthorizationMiddleware } from '../../middleware/authorization';
import { uploadMiddleware } from '../../middleware/upload';

export const imageRoutes = {
  get: {
    readAllImages: {
      path: '/images',
      middleware: [allRolesAuthorizationMiddleware],
      nextFunc: read,
    },
  },
  put: {},
  post: {
    upload: {
      path: '/images',
      middleware: [allRolesAuthorizationMiddleware, uploadMiddleware.array('images', 25)],
      nextFunc: upload,
    },
  },
  delete: {
    logout: {
      path: '/images/:imageId',
      middleware: [allRolesAuthorizationMiddleware],
      nextFunc: destroy,
    },
  },
};
