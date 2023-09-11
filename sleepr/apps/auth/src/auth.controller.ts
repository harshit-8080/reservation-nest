import { Controller, Get, UseGuards, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { CurrentUser } from './decorators/current.user.decorators';
import { UserDocument } from './users/models/user.schema';
import { Response, response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    console.log('======');
    console.log(data);
    console.log('======');
    return data.user;
  }
}
