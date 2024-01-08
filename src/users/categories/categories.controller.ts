import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
   let result = await this.categoriesService.create(createCategoryDto);
   if(result.data){
    return res.status(200).json({
      data: result.data,
      message: "Create successfully"
    })
   }
   return res.status(500).json({
    message: "Create failed"
   })
    
  }

  @Get()
  async findAll(@Query('status') status: string, @Res() res: Response) {
    if(status){
      let result = await this.categoriesService.findByStatus(status);
      if(result.data){
        return res.status(200).json({
          message: "Find successfully",
          data: result.data
        })
      }
      return res.status(500).json({
        message: "Find failed",
      })
    }
    else{
      let result = await this.categoriesService.findAll();
      if(result.data){
        return res.status(200).json({
          message: "Find successfully",
          data: result.data
        })
      }
      return res.status(500).json({
        message: "Find failed",
      })
    }
    
  }


  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res: Response){
    let result = await this.categoriesService.update(id, updateCategoryDto);
    if(result.data){
      return res.status(200).json({
        data: result.data,
        message:"Category updated successfully"
      })
    }
    res.status(501).json({
      message: "Category not updated"
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    let result = await this.categoriesService.remove(+id);
    if(result.data){
      return res.status(200).json({
        data: result.data,
        message: "Category deleted successfully"
      })
    }
    res.status(500).json({
      message: "Category not deleted"
    })
  }
}
