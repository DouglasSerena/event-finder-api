import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategotyDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Controller('api/category')
export class CategoryController {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  @Get() public getAll() {
    return this.categoryModel.find().exec();
  }

  @Post() public async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryModel.create(createCategoryDto);
  }
  
  @Put(':id') public async update(
    @Param('id') _id: number,
    @Body() updateCategoryDto: UpdateCategotyDto,
  ) {
    await this.categoryModel.updateOne({ _id }, updateCategoryDto);
  }
}
