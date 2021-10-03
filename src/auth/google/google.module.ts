import { GoogleController } from './google.controller';
import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy],
})
export class GoogleModule {}
