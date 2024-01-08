import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {sign} from 'jsonwebtoken'
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      let {err, data} = await this.usersService.register(createUserDto);
    if(err){
      if(err?.meta?.target == 'users_email_key'){
        throw "Email already exists"
      } 
      
      if(err?.meta?.target == 'users_name_key'){
        throw "Name already exists"
      }

      
    }
    return res.status(200).json({
      message:"Register successfully"
    })
    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
    
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('login')
  async login(@Body() body: {
    email: string;
    password: string;
  }, @Res() res: Response) {
    try {
      let {err, data} = await this.usersService.findByEmail(body.email);
      if(err) {
        throw err || "User khong ton tai"
      }

      if(body.password != data.password) {
        throw "Mat khau khong chinh xac"
      }

      return res.status(200).json({
        token: sign({...data}, "phuongxauxi", {expiresIn: "1d"})
      })
    }catch(err) {
      return res.status(500).json({
        message: err
      })
    }
  }
}
