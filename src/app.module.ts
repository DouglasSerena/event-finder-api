import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    CategoryModule,
    EventModule,
    MongooseModule.forRoot(
      'mongodb+srv://DouglasSerena:pBqUGr81PTKnDFwi@cluster0.exvek.mongodb.net/events-finder?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
