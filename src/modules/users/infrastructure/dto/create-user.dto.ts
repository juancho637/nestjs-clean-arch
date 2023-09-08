import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserType } from '../../domain';

export class CreateUserDto implements CreateUserType {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
