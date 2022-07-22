import { IsString, IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../status-type.enum';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  accountable: string[];

  @IsString()
  deliveryDate: string;

  @IsString()
  @IsEnum(TaskStatusEnum)
  status: string;
}
