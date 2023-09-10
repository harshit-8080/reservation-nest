import { Inject, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(protected readonly userRepository: UserRepository) {}

  async create(createUserDto: createUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
