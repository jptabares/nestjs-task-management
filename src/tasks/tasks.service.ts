import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  public getTasks() {
    return this.tasks;
  }
}
