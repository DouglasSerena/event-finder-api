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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { handleTry } from 'src/utils/handle-try';
import { CreateEventDto } from './dto/create-event.dto';
import { LocationDto } from './dto/location.dto';
import { SearchDto } from './dto/search.dto';
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

  @Get('search') public async search(@Query() searchDto: SearchDto) {
    const [data, error] = await handleTry(this.eventService.search(searchDto));
    if (data) {
      return { data: data };
    } else {
      return new BadRequestException(error);
    }
  }

  @Get('location') public async getByLocation(
    @Query() locationDto: LocationDto,
  ) {
    const [data, error] = await handleTry(
      this.eventService.getByLocation(locationDto),
    );
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

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  public async getByIdUser(@Param('userId') userId: string) {
    const [data, error] = await handleTry(
      this.eventService.getByIdUser(userId),
    );
    if (data) {
      return { data: data };
    } else {
      return new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async create(
    @Res() response: Response,
    @Body() createEventDto: CreateEventDto,
  ) {
    const [_, error] = await handleTry(
      this.eventService.create(createEventDto as any),
    );
    if (!error) {
      return response.status(201).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  public async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateEventDto: CreateEventDto,
  ) {
    const [data, error] = await handleTry(
      this.eventService.update(id, updateEventDto as any),
    );
    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  public async delete(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const [data, error] = await handleTry(
      this.eventService.delete(id, request.user['id']),
    );
    if (data) {
      return response.status(204).send();
    } else {
      return response.status(400).json(new BadRequestException(error));
    }
  }
}
