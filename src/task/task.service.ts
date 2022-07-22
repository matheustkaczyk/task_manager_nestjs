import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { StoredTask } from '../task/stored-task.interface';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.TaskModel(createTaskDto);
    createdTask.save()

    return createdTask;
  }

  async findAll(): Promise<{ message: string } | StoredTask[]> {
    const foundTasks = await this.TaskModel.find();

    if (foundTasks.length > 0) {
      return foundTasks;
    }

    return { message: "No Task found!" }
  }

  async findOne(id: string): Promise<{ message: string } | StoredTask> {
    try {
      const foundTask = await this.TaskModel.findOne({ _id: id });
  
      if (foundTask) {
        return foundTask;
      }
      
      return { message: 'Task not found!' }
    } catch (error) {
      return { message: 'Wrong ID format!' }
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<{ message: string }> {
    try {
      const updatingTask = await this.TaskModel.findByIdAndUpdate(id, updateTaskDto);
  
      if (updatingTask) {
        return { message: 'Task updated successfully!' }
      }
      
      return { message: 'Task not found!' }
    } catch (error) {
      return { message: 'Wrong ID format!' }
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedTask = await this.TaskModel.deleteOne({ _id: id });
    
    if (deletedTask.deletedCount > 0) {
      return { message: "Task successfully deleted" }
    }

    return { message: "Task not found" }
  }
}
