/*
https://docs.nestjs.com/providers#services
*/

import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/services/category.service';
import { handleTry } from 'src/utils/handle-try';
import { simplify } from 'src/utils/simplify';
import { SearchDto } from '../dto/search.dto';
import { IEvent } from '../interface/event.interface';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private categoryService: CategoryService,
    private httpService: HttpService,
  ) {}

  public async getAll() {
    return await this.eventModel.find().exec();
  }

  public async getByIdUser(userId: string) {
    return await this.eventModel.find({ userId }).exec();
  }

  public async getById(_id: string) {
    const [data, error] = await handleTry(
      this.eventModel.findById({ _id }).exec(),
    );
    if (error || !data) {
      throw new Error('Event not found');
    }

    return data;
  }

  public async getByLocation(latitude: number, longitude: number) {
    return await this.eventModel
      .find({
        $and: [
          { longitude: { $gte: longitude - 0.2, $lt: longitude + 0.2 } },
          { latitude: { $gte: latitude - 0.2, $lt: latitude + 0.2 } },
        ],
      })
      .exec();
  }

  public async create(event: IEvent) {
    const category = await this.categoryService.getById(event.categoriesId[0]);
    const tags = await this.filterTags(event);

    return await this.eventModel.create({
      ...event,
      tags,
      icon: category.icon,
    });
  }

  public async update(_id: string, event: IEvent) {
    await this.getById(_id);

    const category = await this.categoryService.getById(event.categoriesId[0]);
    const tags = await this.filterTags(event);

    return await this.eventModel.updateOne(
      { _id },
      { ...event, tags, icon: category.icon },
    );
  }

  public async delete(_id: string, userId: string) {
    await this.getById(_id);

    return await this.eventModel.deleteOne({ _id, userId });
  }

  public async search(search: SearchDto) {
    const query = search.query || search.q;
    const tags = simplify(query);
    const events = await this.eventModel.find(
      {
        $or: [
          { tags: { $all: tags } },
          { name: new RegExp(`.*${query}.*`, 'gi') },
        ],
      },
      null,
      { limit: search?.limit || 5 },
    );
    const [data] = await handleTry(
      this.searchLocation(query, {
        limit: search.limit || 5,
      }),
    );
    return [...events, ...data];
  }

  public async searchLocation(
    value: string,
    options?: { limit?: number; language?: string },
  ) {
    const [data] = await handleTry(
      this.httpService
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
          {
            params: {
              access_token:
                'pk.eyJ1IjoiZG91Z2xhc3NlcmVuYSIsImEiOiJja2VrMmR6bXMxc3czMnltejIzbXh5eHIwIn0.uUxqAx39JExJ__-KxxhEyQ',
              limit: options?.limit || 5,
              language: options?.language || 'pt-BR',
            },
          },
        )
        .toPromise(),
    );

    return data.data.features.map((location) => {
      return {
        icon: 'place',
        name: location.place_name,
        longitude: location.center[0],
        latitude: location.center[1],
      };
    });
  }

  private async filterTags(event: IEvent) {
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

    for (const categoryId of event.categoriesId) {
      const category = await this.categoryService.getById(categoryId);
      tags.push(...category.tags);
    }

    return tags;
  }
}
