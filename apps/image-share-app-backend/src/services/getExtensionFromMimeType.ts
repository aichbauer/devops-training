import { ALLOWED_IMAGE_MIME_TYPES } from '../config/allowedMimeTypes';

export const getExtensionFromMimeType = (mimeType: string) => {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
    throw new Error('MimeType is not allowed');
  }

  const extension = mimeType.split('/')[1];

  return extension;
};

export default getExtensionFromMimeType;
