import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string, role : string): Promise<any> {
    const user = await this.prisma.account.findUnique({
      where: { username: username },
    });
    if (!user) {
      console.error(`User not found: ${username}`);
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    if (!user.password) {
      console.error(`Password is missing for user: ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password');
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: pwd, ...result } = user;
    return result;
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.validateUser(
      createAuthDto.username,
      createAuthDto.password,
      createAuthDto.role
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const customer = await this.prisma.customers.findFirst({
      where: { accountId: user.id },
    });

    if (!customer) {
      console.error('Customer not found for account ID:', user.id);
      throw new NotFoundException('Customer not found');
    }

    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      custId: customer.id,
      role : user.role
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    const user = await this.prisma.account.findUnique({
      where: { id: payload.sub },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async create(createAuthDto: {
    username: string;
    password: string;
    email: string;
    name: string;
    contact: string;
    role : Role;
  }) {
    const { username, password, email, name, contact , role } = createAuthDto;

    const existingUser = await this.prisma.account.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      throw new ConflictException('Username already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.account.create({
      data: {
        username: username,
        password: hashedPassword,
        role : role,
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
