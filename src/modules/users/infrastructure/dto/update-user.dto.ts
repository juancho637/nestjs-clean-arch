import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateUserType } from '../../domain';

export class UpdateUserDto implements UpdateUserType {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
