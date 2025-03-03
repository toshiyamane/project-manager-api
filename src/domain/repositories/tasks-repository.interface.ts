import { DeepPartial } from 'typeorm';
import { ITask } from '../interfaces/task.interface';
export interface ITasksRepository {
  findAll(userId: number): Promise<ITask[]>;
  findById(id: number): Promise<ITask | null>;
  add(payload: DeepPartial<ITask>): Promise<ITask>;
  updateById(payload: DeepPartial<ITask>);
}
