import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { cwd } from 'process';

export const ABSOLUTE_IMAGE_PATH = path.join(cwd(), 'src', 'images');
export const ABSOLUTE_USER_UPLOADS_IMAGE_PATH = path.join(ABSOLUTE_IMAGE_PATH, 'user-uploads');
export const ABSOLUTE_TEMPORARY_IMAGE_PATH = path.join(ABSOLUTE_IMAGE_PATH, 'tmp');

export const ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL = path.join(
  '/static/images/user-uploads',
);

if (!existsSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH)) {
  mkdirSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true });
}
if (!existsSync(ABSOLUTE_TEMPORARY_IMAGE_PATH)) {
  mkdirSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true });
}
