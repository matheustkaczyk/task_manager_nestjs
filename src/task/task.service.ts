import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { StoredTask } from '../task/stored-task.interface';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private TaskModel: Model<TaskDocument>,
    private userService: UserService
    ) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.TaskModel(createTaskDto);
    createdTask.save()

    return createdTask;
  }

  async findAll(user): Promise<{ message: string } | StoredTask[]> {
    try {
      const foundUser = await this.userService.findOne(user.id);

      if (foundUser.type === 'admin') {
        const foundTasks = await this.TaskModel.find();
    
        return foundTasks;
      } else {
        const foundTasks = await this.TaskModel.find({ $or: [{ name: foundUser.name }, { accountable: { $in: foundUser.name } }] })

        return foundTasks;
      }
    } catch (error) {
      return error.message;
    }
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

  async update(id: string, updateTaskDto: UpdateTaskDto, user: any): Promise<{ message: string }> {
    try {
      const foundUser = await this.userService.findOne(user.id);
      const foundTask = await this.TaskModel.findById(id);

      if (
        foundUser.type === 'admin' ||
        foundTask.createdBy === foundUser.name ||
        foundTask.accountable.some((person) => person === foundUser.name)
      ) {
        const updatingTask = await this.TaskModel.findByIdAndUpdate(id, updateTaskDto);
    
        if (updatingTask) {
          return { message: 'Task updated successfully!' }
        }
        
        return { message: 'Task not found!' }
      }

      return { message: "No permission" }
    } catch (error) {
      return { message: 'Wrong ID format!' }
    }
  }

  async remove(id: string | string[], user: any): Promise<HttpException> {
    const userFound = await this.userService.findOne(user.id);
    let deletedCount = 0;

    try {
      if (userFound.type === 'admin') {
        if (Array.isArray(id)) {
          const deletedTasks = await this.TaskModel.deleteMany({ _id: { $in: id } });
  
          deletedCount += deletedTasks.deletedCount;
        } else {
          const deletedTask = await this.TaskModel.deleteOne({ _id: id });
  
          deletedCount += deletedTask.deletedCount;
        }
      } else {
        if (Array.isArray(id)) {
          id.map(async (idNumber) => {
            console.log(id);
            const foundTask = await this.TaskModel.findById(idNumber) as any;
  
            const isCreator = foundTask.createdBy === userFound.name;
            const isAccountable = foundTask.accountable.some((person) => person === userFound.name);
  
            if (isCreator || isAccountable) {
              const deletedTasks = await this.TaskModel.deleteMany({ _id: { $in: idNumber } });
  
              deletedCount += deletedTasks.deletedCount;
            }
          })
        } else {
          const foundTask = await this.TaskModel.findOne({ _id: id }) as StoredTask;

          const isCreator = foundTask.createdBy === userFound.name;
          const isAccountable = foundTask.accountable.some((person) => person === userFound.name);
            
          if (isCreator || isAccountable) {
            const deletedTasks = await this.TaskModel.deleteOne({ _id: id });

            deletedCount += deletedTasks.deletedCount;
          }
        }
      }
    } catch (error) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async put(id: string, status: string, user: any) {
    try {
      const foundUser = await this.userService.findOne(user.id);
      const foundTask = await this.TaskModel.findById(id);

      if (
        foundUser.type === 'admin' ||
        foundTask.createdBy === foundUser.name ||
        foundTask.accountable.some((person) => person === foundUser.name)
      ) {
        const updatingStatus = await this.TaskModel.findByIdAndUpdate(id, { $set: { status } });

        if (updatingStatus) {
          return new HttpException('OK', HttpStatus.OK);
        }
      }

      return new HttpException('No permission', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      return new HttpException('Wrong ID Format', HttpStatus.BAD_REQUEST);
    }
  }
}
