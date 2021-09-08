import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('api/event')
export class EventController {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  @Get() public getAll() {
    return this.eventModel.find().exec();
  }

  @Post() public async create(@Body() createEventDto: CreateEventDto) {
    await this.eventModel.create(createEventDto);
  }

  @Put(':id') public async update(
    @Param('id') _id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    await this.eventModel.updateOne({ _id }, updateEventDto);
  }
}
