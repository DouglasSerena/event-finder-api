import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/services/user.service';
import { handleTry } from 'src/utils/handle-try';
import { AuthService } from '../auth.service';

@Controller('api/auth/facebook')
export class FacebookController {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('confirm')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthConfirm(@Req() req: Request, @Res() res: Response) {
    const user = req.user as Omit<IUser, 'id'>;
    const [data] = await handleTry(
      this.userService.getByIdOrProviderId(user.providerId),
    );

    let userRegistered = data;
    if (!userRegistered) {
      const [data] = await handleTry(this.userService.create(user));
      userRegistered = data;
    }

    const { accessToken } = this.authService.login(userRegistered);
    return res.redirect(
      `${this.config.get('OAUTH2_REDIRECT')}/auth/confirm?token=${accessToken}`,
    );
  }
}
