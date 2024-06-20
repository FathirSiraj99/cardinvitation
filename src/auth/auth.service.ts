import { Injectable, NotFoundException, UnauthorizedException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; contact: string; email: string; username: string; password: string }) {
    if (data.password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const isUserValid = await this.prisma.account.findUnique({
      where: { username: data.username },
    });

    if (isUserValid) {
      throw new ConflictException('Username already in use');
    }

    const user = await this.prisma.account.create({
      data: {
        username: data.username,
        password: hashPassword,
      },
    });

    const customer = await this.prisma.customers.create({
      data: {
        name: data.name,
        email: data.email,
        contact: data.contact,
        accountId: user.id,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Account created successfully',
      user: user,
    };
  }

  async validateUser(loginDto: CreateAuthDto) {
    const isUserValid = await this.prisma.account.findFirst({
      where: { username: loginDto.username },
    });

    if (!isUserValid) {
      throw new NotFoundException(`No user found for this username: ${loginDto.username}`);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, isUserValid.password);

    if (loginDto.password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password, try again');
    }

    const user = await this.prisma.account.findFirst({
      where: { id: isUserValid.id },
    });

    return {
      message: `Hello, ${user.username}`,
    };
  }

  async login(loginDto: CreateAuthDto) {
    const isUserValid = await this.prisma.account.findFirst({
      where: { username: loginDto.username },
    });

    if (!isUserValid) {
      throw new NotFoundException(`No user found for this username: ${loginDto.username}`);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, isUserValid.password);

    if (loginDto.password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password, try again');
    }

    return {
      message: `Login successful, welcome ${isUserValid.username}`,
    };
  }
}
