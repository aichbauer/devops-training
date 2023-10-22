import { Request } from 'express';

export const requestParser = (req: Request, bodyAs?: string) => {
  // @ts-ignore
  const { payload, params, body } = req;

  const imageId = params.imageId || '';
  const userId = params.userId || payload?.userId || '';
  const isUserIdParamEmpty = !params.userId;
  const images = (req.files as Express.Multer.File[]) || [];

  return {
    imageId,
    userId,
    body,
    isUserIdParamEmpty,
    [bodyAs || 'rawBody']: body,
    images,
    payload,
  };
};
