import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Controller('api/category')
export class CategoryController {
  constructor(
    @InjectModel(Category.name) private eventModel: Model<CategoryDocument>,
  ) {}

  @Get() public getAll() {
    return this.eventModel.find().exec();
  }

  @Post() public async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.eventModel.create(createCategoryDto);
  }
}
