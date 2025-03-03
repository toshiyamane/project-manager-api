import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ITask } from 'src/domain/interfaces/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
@Injectable()
export class GetAllTasksService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
  ) {}
  async execute(payload: { userId: number }): Promise<ITask[]> {
    // fetch user data
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const tasks = await this.tasksRepository.findAll(payload.userId);
    if (!tasks) {
      throw new Error('Erro ao listar tarefas');
    }
    return tasks;
  }
}
