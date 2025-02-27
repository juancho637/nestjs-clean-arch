import { IsNotEmpty, IsString } from 'class-validator';
import { SignInType } from '../../domain';

export class SignInDto implements SignInType {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
