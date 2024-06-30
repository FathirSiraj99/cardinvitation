import { Module } from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { WeddingsController } from './weddings.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JWTUtil } from 'src/auth/interface/jwt-util';

@Module({
  controllers: [WeddingsController],
  providers: [WeddingsService, PrismaService, JwtService, JWTUtil],
})
export class WeddingsModule {}
