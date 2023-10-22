import { IPayloadAccessToken } from "./src/services/auth";

declare namespace Express {
  export interface Request {
     payload?: IPayloadAccessToken
  }
}