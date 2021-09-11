/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleTry } from 'src/utils/handle-try';
import { simplify } from 'src/utils/simplify';
import { SearchDto } from '../dto/search.dto';
import { IEvent } from '../interface/event.interface';
import { ISearchOptions } from '../interface/search-options.interface';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  public async getAll() {
    return await this.eventModel.find().exec();
  }

  public async getById(_id: number) {
    const [data, error] = await handleTry(
      this.eventModel.findById({ _id }).exec(),
    );
    if (error || !data) {
      throw new Error('Category not found');
    }

    return data;
  }

  public async create(event: IEvent) {
    const tags = this.filterTags(event);

    return await this.eventModel.create({ ...event, tags });
  }

  public async update(_id: number, event: IEvent) {
    await this.getById(_id);

    const tags = this.filterTags(event);

    return await this.eventModel.updateOne({ _id }, { ...event, tags });
  }

  public async delete(_id: number) {
    await this.getById(_id);

    return await this.eventModel.deleteOne({ _id });
  }

  public async search(search: SearchDto) {
    const tags = simplify(search.query);
    return this.eventModel.find({ tags: { $all: tags } }, null, {
      limit: search?.limit || 10,
    });
  }

  private filterTags(event: IEvent) {
    const tags = simplify(event.name);

    const helperTags = event.helperTags.reduce((prev, tag) => {
      const tagFilter = simplify(tag);
      const notExistTag =
        tags.findIndex((tag) => tagFilter.includes(tag)) === -1;

      if (notExistTag) {
        prev.push(...tagFilter);
      }
      return prev;
    }, [] as string[]);

    tags.push(...helperTags);
    return tags;
  }
}
