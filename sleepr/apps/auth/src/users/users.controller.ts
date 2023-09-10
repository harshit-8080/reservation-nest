import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }
}
