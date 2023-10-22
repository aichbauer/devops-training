import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt';

export interface IPayloadAccessToken {
  rle: string;
  iss: string;
  sub: string;
  aud: string;
  lng: string;
  jti: string;
  nonce: string;
  auth_time: number;
}

export interface IPayloadAccessTokenIntern {
  role: string;
  issuer: string;
  userId: string;
  audience: string;
  language: string;
  jwtId: string;
  nonce: string;
  auth_time: number;
  valid: boolean;
}

const signAccessToken = async (payload: IPayloadAccessToken, expiresIn?: number) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn || 60 * 60 * 4, // default 4 hours
  });
};

const verifyAccessToken = async (token: string, secret?: string) => {
  const bearer = 'Bearer ';
  const hasBearer = token?.includes(bearer);

  let payload: IPayloadAccessTokenIntern = {
    role: '',
    issuer: '',
    userId: '',
    audience: '',
    jwtId: '',
    nonce: '',
    auth_time: 0,
    language: '',
    valid: false,
  };
  let thisToken = token;

  if (hasBearer) {
    // eslint-disable-next-line prefer-destructuring
    thisToken = token.split(bearer)[1];
  }

  try {
    const originalPayload: IPayloadAccessToken = (await jwt.verify(
      thisToken,
      secret || jwtSecret,
    )) as any;

    payload = {
      role: originalPayload.rle,
      issuer: originalPayload.iss,
      userId: originalPayload.sub,
      audience: originalPayload.aud,
      jwtId: originalPayload.jti,
      nonce: originalPayload.nonce,
      auth_time: originalPayload.auth_time,
      language: originalPayload.lng,
      valid: true,
    };
  } catch {
    // no-op
  }

  return payload;
};

export default {
  signAccessToken,
  verifyAccessToken,
};
