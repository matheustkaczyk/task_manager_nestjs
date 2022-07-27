import { Controller, Get, Post, Body, Patch, Param, Request, Delete, ValidationPipe, UseGuards, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.taskService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.taskService.update(id, updateTaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id')
  remove(@Body('id') id: string | string[], @Request() req) {
    return this.taskService.remove(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('id')
  patchStatus(@Body('id') id: string, @Body('status') status: string, @Request() req) {
    return this.taskService.patch(id, status, req.user);
  }
}
