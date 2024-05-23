import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET',
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refreshToken) {
      return req.cookies.refreshToken;
    }
    return null;
  }

  validate(req: Request, payload: any) {
    return { ...payload, refreshToken: req.cookies.refreshToken };
  }
}
