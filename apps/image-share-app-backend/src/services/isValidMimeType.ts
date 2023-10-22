import { ALLOWED_IMAGE_MIME_TYPES } from '../config/allowedMimeTypes';

export const isValidMimeType = (
  files: Express.Multer.File[],
  allowedMimeTypes = ALLOWED_IMAGE_MIME_TYPES,
) => {
  const includesOnlyValidMimeTypes = files.every((file) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      return true;
    }

    return false;
  });

  return includesOnlyValidMimeTypes;
};

export default isValidMimeType;
