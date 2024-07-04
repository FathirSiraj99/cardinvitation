// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false; 
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const userId = payload.sub; 

      const user = await this.prisma.account.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return false; 
      }

      request.user = user; 

      return roles.some(role => user.role === role); 
    } catch (error) {
      return false; 
    }
  }
}
