import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA',
    });
  }

  validate(payload: { sub: string; email: string; seller: boolean }) {
    return {
      userId: payload.sub,
      email: payload.email,
      seller: payload.seller,
    };
  }
}
