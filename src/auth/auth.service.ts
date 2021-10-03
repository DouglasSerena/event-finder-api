import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: IUser) {
    const payload: JwtPayload = {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
