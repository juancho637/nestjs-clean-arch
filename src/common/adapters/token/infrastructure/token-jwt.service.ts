import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadType, TokenServiceInterface } from '../domain';

@Injectable()
export class TokenJwtService implements TokenServiceInterface {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: TokenPayloadType): {
    token: string;
    tokenExpiration: number;
  } {
    const token = this.jwtService.sign(payload);
    const expiration = this.jwtService.decode(token).exp;

    return { token, tokenExpiration: expiration * 1000 };
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
