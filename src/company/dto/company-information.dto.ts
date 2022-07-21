import { IsString, MaxLength } from 'class-validator';

export class CompanyInformationDto {
  @IsString()
  @MaxLength(40)
  name: string;
}