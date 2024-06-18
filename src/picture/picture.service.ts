import { Injectable } from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PictureService {

  constructor (private readonly prisma: PrismaService){}
  
  async create(createPictureDto: CreatePictureDto) {
    return await this.prisma.picture.create({
      data : createPictureDto
    });
  }

  async getImagebyCustomeraId(customersId : string){
      return await this.prisma .picture.findMany({
        where:{customersId},
      })
  }

 
}
