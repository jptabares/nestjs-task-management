import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  public getTask(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public addTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  public deleteTask(@Param('id') id: string): boolean {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Body('status') status: TaskStatus,
    @Param('id') id: string,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
