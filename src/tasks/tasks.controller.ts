import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddTaskDto } from './dto/add-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  public getTask(@Param('id') taskId): Task {
    return this.tasksService.getTask(taskId);
  }

  @Post()
  public addTask(@Body() addTaskDto: AddTaskDto): Task {
    return this.tasksService.addTask(addTaskDto);
  }
}
