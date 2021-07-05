import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get(':id')
  public getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public addTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  public deleteTaskById(@Param('id') id: string): Promise<boolean> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public asyncupdateTaskStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, updateTaskStatusDto);
  }
}
