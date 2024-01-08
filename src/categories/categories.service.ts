import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import PrismaService from '../prisma/prisma.service';
import { AvailableStatus } from '@prisma/client';
@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

  async create(newCategory: CreateCategoryDto) {
    try {
      let category = await this.prisma.categories.create({
        data: {
          name: newCategory.name,
          avatar: newCategory.avatar
        }
      })
      return {
        data: category
      }
    } catch (error) {
      console.log(error);

      return {
        data: null,
        message: "Lỗi"
      }
    }
  }

  async findAll() {
    try {
      let categories = await this.prisma.categories.findMany({

      })
      return {
        data: categories
      }
    } catch (error) {
      return {
        data: null
      }
    }
  }

  async findByStatus(status) {
    try {
      let categories = await this.prisma.categories.findMany({
        where: {
          status: status
        }
      })
      return {
        data: categories,
      }
    } catch (error) {
      return {
        data: null
      }
    }
  }

  async update(id: number, updateCategory: UpdateCategoryDto) {
    try {
      let category = await this.prisma.categories.update({
        where: {
          id
        },
        data: updateCategory
      })
      return {
        data: category
      }
    }
    catch (err) {
      console.log(err);
      return {
        data: null,
        message: "Lỗi"
      }

    }
  }

  async remove(id: number) {
    try {
      let category = await this.prisma.categories.delete({
        where: {
          id
        }
      })
      return{
        data: category
      }
    } catch (error) {
      return{
        data: null,
      }
    }
  }
}
