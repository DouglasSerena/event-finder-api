import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/services/user.service';
import { handleTry } from 'src/utils/handle-try';
import { AuthService } from '../auth.service';

@Controller('api/auth/google')
export class GoogleController {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('confirm')
  @UseGuards(AuthGuard('google'))
  async googleAuthConfirm(@Req() req: Request, @Res() res: Response) {
    const user = req.user as Omit<IUser, 'id'>;
    const [data] = await handleTry(
      this.userService.getByIdOrProviderId(user.providerId),
    );

    let userRegistered = data;
    if (!userRegistered) {
      const [data] = await handleTry(this.userService.create(user));
      userRegistered = data;
    }

    const { accessToken } = this.authService.login({
      id: userRegistered.id,
      avatar: userRegistered.avatar,
      email: userRegistered.email,
      username: userRegistered.username,
      provider: userRegistered.provider,
    });
    return res.redirect(
      `${this.config.get('OAUTH2_REDIRECT')}/auth/confirm?token=${accessToken}`,
    );
  }
}
