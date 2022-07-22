import { IsString, IsDate, IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../status-type.enum';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  accountable: string[];

  @IsDate()
  deliveryDate: Date;

  @IsString()
  @IsEnum(TaskStatusEnum)
  status: string;
}
