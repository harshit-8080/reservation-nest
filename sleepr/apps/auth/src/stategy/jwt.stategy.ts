import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          // console.log('line 13 ==> ', request);
          return request?.cookies?.Authentication || request?.Authentication;
        },
      ]),
      secretOrKey: 'secretttttkeyyyyyyyyyyy',
    });
  }

  async validate({ userId }) {
    return this.userService.getUser({ _id: userId });
  }
}
