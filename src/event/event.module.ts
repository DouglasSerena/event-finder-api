import { EventService } from './services/event.service';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { Event, EventSchema } from './schemas/event.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    HttpModule,
    CategoryModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
