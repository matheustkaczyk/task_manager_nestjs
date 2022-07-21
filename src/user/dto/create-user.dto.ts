import { IsString, MinLength, MaxLength, Matches, IsEnum } from 'class-validator';
import { UserTypes } from '../user-type.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  name: string;

  @IsString()
  @Matches(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i, { message: 'Invalid e-mail' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsEnum(UserTypes)
  type: string;
}
