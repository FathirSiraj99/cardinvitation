import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import path from 'path';

@Injectable()
export class AuthService {
  constructor (private readonly prisma: PrismaService){}

  async create(createAuthDto: CreateAuthDto) {
    return await this.prisma.account.create({
      data: createAuthDto
    })

  }

  

 }
