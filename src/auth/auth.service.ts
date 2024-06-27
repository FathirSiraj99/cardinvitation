import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.account.findUnique({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    const user = await this.prisma.account.findUnique({ where: { id: payload.sub } });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async create(createAuthDto: { username: string; password: string; email: string; name: string; contact: string }) {
    const { username, password, email, name, contact } = createAuthDto;

    const existingUser = await this.prisma.account.findUnique({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.account.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    await this.prisma.customers.create({
      data: {
        name,
        email,
        contact,
        accountId: user.id,
      },
    });

    return {
      message: 'Account created successfully',
      user,
    };
  }
}
