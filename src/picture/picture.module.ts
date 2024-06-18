import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PictureController],
  providers: [PictureService, PrismaService],
})
export class PictureModule {}
