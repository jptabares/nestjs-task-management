import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasks(): Task[] {
    return this.tasks;
  }
}
