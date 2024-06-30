import { Injectable } from '@nestjs/common';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WeddingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async create(createWeddingDto: CreateWeddingDto, token: string) {
    const secret = process.env.JWT_SECRET;
    const payload = await this.jwt.verify(token, { secret });
    const customerId = payload.custId;

    const existingWedding = await this.prisma.wedings.findUnique({
      where: { customerId: customerId },
    });

    if (existingWedding) {
      if (customerId) {
        return await this.prisma.wedings.update({
          where: { customerId: customerId },
          data: createWeddingDto,
        });
      }
    }

    return this.prisma.wedings.create({
      data: {
        ...createWeddingDto,
        customerId: customerId,
      },
    });
  }

  async getWeddingsByCustomerId(customerId: string) {
    try {
      return await this.prisma.wedings.findMany({
        where: {
          customerId: customerId,
        },
      });
    } catch (error) {
      console.log(error);

      throw new Error('Unable to fetch weddings data');
    }
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
