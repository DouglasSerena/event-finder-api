/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/upload')
export class UploadController {
  constructor(private config: ConfigService) {}

  @Post('image')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const urls = files.map((file) => {
      return {
        url: `${this.config.get('APP_URL')}/uploads/${file.filename}`,
      };
    });

    return { data: urls };
  }
}
