import { NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne(id);
    if (!found)
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    return found;
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

  public async deleteTaskById(id: string): Promise<boolean> {
    const res: DeleteResult = await this.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Task with ID ${id} does not exist`);
    else return true;
  }

  public async updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task: Task = await this.getTaskById(id);
    task.status = status;
    await this.save(task);
    return task;
  }
}
