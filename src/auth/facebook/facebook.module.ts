import { FacebookController } from './facebook.controller';
import { Module } from '@nestjs/common';
import { FacebookStrategy } from './facebook.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [FacebookController],
  providers: [FacebookStrategy],
})
export class FacebookModule {}
