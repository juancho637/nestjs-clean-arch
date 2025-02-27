import { TokenPayloadType } from './token-payload.type';

export interface TokenServiceInterface {
  generateToken(payload: TokenPayloadType): {
    token: string;
    tokenExpiration: number;
  };
  verifyToken(token: string): any;
}
