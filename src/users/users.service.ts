import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaService from '../prisma/prisma.service'
import { ServiceCreateRes } from './interfaces/service-create-interface';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
  async register(newUser: CreateUserDto) {
    try {
      let user = await this.prisma.users.create({
        data: {
          ...newUser,
          createAt: String(Date.now()),
          updateAt: String(Date.now()),
        }
      })
      return {
        data: user
      }
    } catch (err) {
      console.log(err);
      return {
        err
      }
    }
  }



  async findByEmail(email: string) {
    try {
      let user = await this.prisma.users.findUnique({
        where: {
          email
        }
      })
      if(!user) return {err: "Nguoi dung khong ton tai"}

      return {
        data: user
      }
    }catch(err) {
      return {
        err
      }
    }
  }


}
