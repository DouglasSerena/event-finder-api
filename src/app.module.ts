import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { GoogleModule } from './auth/google/google.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { FacebookModule } from './auth/facebook/facebook.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Global()
@Module({
  imports: [
    UploadModule,
    AuthModule,
    UserModule,
    GoogleModule,
    FacebookModule,
    EventModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
      load: [configuration],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://DouglasSerena:pBqUGr81PTKnDFwi@cluster0.exvek.mongodb.net/events-finder?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
