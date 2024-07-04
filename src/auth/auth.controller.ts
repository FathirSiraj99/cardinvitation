import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './guard/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() CreateAuthDto : CreateAuthDto) {
    return await this.authService.login(CreateAuthDto);
  }

  @Post('signup')
  async signup(
    @Body()
    data: {
      username: string;
      password: string;
      email: string;
      name: string;
      contact: string;
      role : Role
    },
  ) {
    return this.authService.create(data);
  }

  @Get('profileuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BRONZE)
  getProfileUser(@Request() req) {
    return req.user;
  }

  @Get('profileadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getProfileAdmin(@Request() req) {
    return req.user;
  }

 
}
