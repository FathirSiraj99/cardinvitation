import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WeddingsService } from './weddings.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JWTUtil } from 'src/auth/interface/jwt-util';
import { wedings } from '@prisma/client';

@Controller('weddings')
export class WeddingsController {
  constructor(
    private readonly weddingsService: WeddingsService,
    private readonly jtwUtil: JWTUtil,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createWeddingDto: CreateWeddingDto, @Request() req) {
    const token = await req.headers.authorization.split(' ')[1];
    return await this.weddingsService.create(createWeddingDto, token);
  }

  @Get('byid')
  @UseGuards(JwtAuthGuard)
  async getWeddingsByCustomerId(
    @Headers('authorization') token: string,
  ): Promise<wedings[]> {
    try {
      if (!token) {
        throw new HttpException(
          'Authorization token is missing',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const decodedToken = await this.jtwUtil.decode(token);
      const customerId = decodedToken.custId;
      const weddings =
        await this.weddingsService.getWeddingsByCustomerId(customerId);
      return await weddings;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch weddings: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.weddingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weddingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeddingDto: UpdateWeddingDto) {
    return this.weddingsService.update(+id, updateWeddingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weddingsService.remove(+id);
  }
}
