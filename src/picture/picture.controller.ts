import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { Customer } from 'src/customers/entities/customer.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('picture')
export class PictureController {
  constructor(
    private readonly prisma: PrismaService,
    pictService: PictureService,
  ) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const customersId = req.body.userId;
          const customersFolder = path.join(
            __dirname,
            '..',
            'uploads',
            `user-${customersId}`,
          );
          cb(null, customersFolder);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageDto: CreatePictureDto,
  ) {
    const userId = parseInt(uploadImageDto.customersId);
    const imagePath = `uploads/customers-${Customer}/${file.filename}`;
    return await this.prisma.picture.create({
      data: uploadImageDto,
    });
  }

  @Get('customers/:customerId')
  async getCustomersImage(@Param('customerId') customerId: string) {
    return this.prisma.picture.findMany({
      where: { customersId: customerId },
    });
  }
}
