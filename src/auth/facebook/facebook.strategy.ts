import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get('FACEBOOK_CLIENT_ID'),
      clientSecret: config.get('FACEBOOK_SECRET'),
      callbackURL: config.get('FACEBOOK_CALLBACK_URL'),
      scope: 'email',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;

    return {
      provider: 'facebook',
      providerId: id,
      username: displayName,
      email: emails[0].value,
      avatar: photos[0].value,
    };
  }
}
