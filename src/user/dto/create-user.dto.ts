import { IsString, IsEmail, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserTypes } from '../user-type.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsEnum(UserTypes)
  type: string;
}
