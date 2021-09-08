import { EventModule } from './event/event.module';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    EventModule,
    MongooseModule.forRoot(
      'mongodb+srv://DouglasSerena:pBqUGr81PTKnDFwi@cluster0.exvek.mongodb.net/events-finder?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
