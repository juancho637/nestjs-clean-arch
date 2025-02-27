import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateRoleType } from '../../domain';

export class UpdateRoleDto implements UpdateRoleType {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  permissionsIds: number[];
}
