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

  findOne(id: number){
    return `This action returns a #${id} user`;
  }
  findAll() {
    return `This action returns all users`;
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


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
