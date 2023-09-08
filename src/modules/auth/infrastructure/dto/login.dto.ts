import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginType } from '../../domain';

export class LoginDto implements LoginType {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
