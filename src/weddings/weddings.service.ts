import { Injectable } from '@nestjs/common';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeddingsService {

  constructor(private readonly prisma : PrismaService){}

  async create(createWeddingDto: CreateWeddingDto) {
    return this.prisma.wedings.create({
      data : createWeddingDto
    })
  }

  async findAll() {
    return await this.prisma.wedings.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} wedding`;
  }

  update(id: number, updateWeddingDto: UpdateWeddingDto) {
    return `This action updates a #${id} wedding`;
  }

  remove(id: number) {
    return `This action removes a #${id} wedding`;
  }
}
