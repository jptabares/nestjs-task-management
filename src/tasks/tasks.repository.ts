import { NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :status', { status });
    if (search)
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    return await query.getMany();
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
