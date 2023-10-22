import multer from 'multer';
import { ABSOLUTE_TEMPORARY_IMAGE_PATH } from '../config/uploadPaths';

export const uploadMiddleware = multer({
  dest: ABSOLUTE_TEMPORARY_IMAGE_PATH,
});
