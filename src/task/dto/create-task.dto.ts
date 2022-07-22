import { IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  accountable: string[];

  @IsDate()
  deliveryDate: Date;
}
