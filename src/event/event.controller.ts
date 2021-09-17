import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { handleTry } from 'src/utils/handle-try';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchDto } from './dto/search.dto';
import { IEvent } from './interface/event.interface';
import { EventService } from './services/event.service';

@Controller('api/event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get() public async getAll() {
    const [data, error] = await handleTry(this.eventService.getAll());
    if (data) {
      return { data: data };
    } else {
      return new BadRequestException(error);
    }
  }

  @Get('search') public async search(@Query() search: SearchDto) {
    const [data, error] = await handleTry(this.eventService.search(search));
    if (data) {
      return { data: data };
    } else {
      return new BadRequestException(error);
    }
  }

  @Get(':id') public async getById(@Param('id') id: string) {
    const [data, error] = await handleTry(this.eventService.getById(id));
    if (data) {
      return { data: data };
    } else {
      return new BadRequestException(error);
    }
  }

  @Post() public async create(
    @Res() response: Response,
    @Body() createEventDto: CreateEventDto,
  ) {
    const [_, error] = await handleTry(
      this.eventService.create(createEventDto as IEvent),
    );
    if (!error) {
      return response.status(201).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }

  @Put(':id') public async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto,
  ) {
    const [data, error] = await handleTry(
      this.eventService.update(id, updateEventDto as IEvent),
    );
    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }

  @Delete(':id') public async delete(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const [data, error] = await handleTry(this.eventService.delete(id));
    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }
}
