import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JWTUtil {
  constructor(private readonly jwtService: JwtService) {}

  decode(auth: string) {
    const token = auth.replace('Bearer ', '');
    const jwt = this.jwtService.decode(token);
    return jwt;
  }
}
