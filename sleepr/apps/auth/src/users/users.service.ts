import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto } from './dto/createUserDto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(protected readonly userRepository: UserRepository) {}

  async create(createUserDto: createUserDto) {
    const checkUser = await this.getUserByEmail(createUserDto.email);
    if (checkUser) {
      throw new InternalServerErrorException('Duplicate user');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    console.log(user);

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        throw new UnauthorizedException('email and password are not valid');
      }

      return user;
    }
  }

  async getUser(_id: any) {
    return this.userRepository.findOne(_id);
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ email });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      return;
    }
  }
}
