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
    },
  ) {
    return this.authService.create(data);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
