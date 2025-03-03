import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { CreateTaskDto } from 'src/gateways/controllers/tasks/dtos/create-task.dto';
@Injectable()
export class CreateTaskService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly tasksRepository: TasksRepositoryService,
    private readonly projcetsRepository: ProjectsRepositoryService,
  ) {}
  async execute(payload: {
    task: CreateTaskDto;
    userId: number;
  }): Promise<ITask> {
    // fetch user data
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const projectData = await this.projcetsRepository.findById(
      payload.task.projectId,
    );
    if (!projectData) {
      throw new Error('Projeto não encontrado');
    }
    const createdTask = await this.tasksRepository.add({
      name: payload.task.name,
      status: payload.task.status,
      project: projectData,
      user: { id: userData.id },
    });
    if (!createdTask) {
      throw new Error('Erro ao criar tarefa');
    }
    return createdTask;
  }
}
