import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { handleTry } from 'src/utils/handle-try';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ICategory } from './interface/category.interface';
import { CategoryService } from './services/category.service';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get() public async getAll() {
    const [data, error] = await handleTry(this.categoryService.getAll());
    if (data) {
      return data;
    } else {
      return new BadRequestException(error);
    }
  }

  @Get(':id') public async getById(@Param('id') id: number) {
    const [data, error] = await handleTry(this.categoryService.getById(id));
    if (data) {
      return data;
    } else {
      return new BadRequestException(error);
    }
  }

  @Post() public async create(@Body() createEventDto: CreateCategoryDto) {
    const [_, error] = await handleTry(
      this.categoryService.create(createEventDto as ICategory),
    );
    if (error) {
      return new BadRequestException(error);
    }
  }

  @Put(':id') public async update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateEventDto: CreateCategoryDto,
  ) {
    const [data, error] = await handleTry(
      this.categoryService.update(id, updateEventDto as ICategory),
    );
    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).send(new BadRequestException(error));
    }
  }

  @Delete(':id') public async delete(
    @Res() response: Response,
    @Param('id') id: number,
  ) {
    const [data, error] = await handleTry(this.categoryService.delete(id));

    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).send(new BadRequestException(error));
    }
  }
}
