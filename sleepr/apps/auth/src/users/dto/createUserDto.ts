import { IsEmail, IsStrongPassword } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
