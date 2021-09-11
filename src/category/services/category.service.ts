/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleTry } from 'src/utils/handle-try';
import { simplify } from 'src/utils/simplify';
import { ICategory } from '../interface/category.interface';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  public async getAll() {
    return await this.categoryModel.find().exec();
  }

  public async getById(_id: number) {
    const [data, error] = await handleTry(
      this.categoryModel.findById({ _id }).exec(),
    );
    if (error || !data) {
      throw new Error('Category not found');
    }

    return data;
  }

  public async create(category: ICategory) {
    const tags = this.filterTags(category);

    return await this.categoryModel.create({ ...category, tags });
  }

  public async update(_id: number, category: ICategory) {
    await this.getById(_id);

    const tags = this.filterTags(category);

    return await this.categoryModel.updateOne({ _id }, { ...category, tags });
  }

  public async delete(_id: number) {
    await this.getById(_id);

    return await this.categoryModel.deleteOne({ _id });
  }

  private filterTags(category: ICategory) {
    return simplify(category.name);
  }
}
