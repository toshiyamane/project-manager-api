import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { CreateProjectDto } from 'src/gateways/controllers/projects/dtos/create-project.dto';
import { IProject } from 'src/domain/interfaces/project.interface';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
@Injectable()
export class CreateProjectService implements BaseUseCase {
  constructor(
    private readonly usersRepository: UsersRepositoryService,
    private readonly projectsRepository: ProjectsRepositoryService,
  ) {}
  async execute(payload: {
    project: CreateProjectDto;
    userId: number;
  }): Promise<IProject> {
    // fetch user data
    const userData = await this.usersRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    const createdProject = await this.projectsRepository.add({
      name: payload.project.name,
      description: payload.project.description,
      user: { id: userData.id },
    });
    if (!createdProject) {
      throw new Error('Erro ao criar projeto');
    }
    return createdProject;
  }
}
