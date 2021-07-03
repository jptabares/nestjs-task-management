import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { AddTaskDto } from './dto/add-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getTask(taskId: string): Task {
    return this.tasks.find((task) => task.id === taskId);
  }

  public addTask(addTaskDto: AddTaskDto): Task {
    const { title, description } = addTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
