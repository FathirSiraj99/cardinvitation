import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GuestController],
  providers: [GuestService, PrismaService],
})
export class GuestModule {}
