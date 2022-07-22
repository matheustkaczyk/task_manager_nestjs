import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../status-type.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
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
