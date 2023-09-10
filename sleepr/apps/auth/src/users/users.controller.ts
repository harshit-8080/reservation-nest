import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/current.user.decorators';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(protected readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
