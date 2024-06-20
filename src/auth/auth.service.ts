import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import path from 'path';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor (private  prisma: PrismaService){}

  async create(createAuthDto: CreateAuthDto) {
   if (createAuthDto.password.length < 6) {
      return new UnauthorizedException('password less then 6 characters')
   }

   const hashPassword = await bcrypt.hash(createAuthDto.password, 10)
   const isUserValid = await this.prisma.account.findUnique({
    where : { username : createAuthDto.username}
   })

   if (isUserValid) {
      return new UnauthorizedException('username already in use')
   }

   const user = await this.prisma.account.create({
      data : {
        username : createAuthDto.username,
        password : hashPassword
      }
   })

  }

    async validateUser(loginDto : CreateAuthDto){
      const isUserValid = await this.prisma.account.findFirst({
        where : {username : loginDto.username}
      })

      if (!isUserValid) {
        throw new NotFoundException(`no user found for this username : ${loginDto.username}`)
      }

        const isPasswordValid = await bcrypt.compare(
          loginDto.password, isUserValid.password
        )

        if (loginDto.password.length < 6) {
          throw new UnauthorizedException('password less then 6 characters')
        }

        if (!isPasswordValid) {
          throw new UnauthorizedException('password is not valid try again')
        }

        const user = await this.prisma.account.findFirst({
            where : { id: isUserValid.id}
        })

    }

    async login (loginDto : CreateAuthDto){
      const isUserValid = await this.prisma.account.findFirst({
          where : {username : loginDto.username}
      })

    }

  

 }
