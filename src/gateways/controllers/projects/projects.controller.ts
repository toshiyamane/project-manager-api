import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
const userId = 1;
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
    private readonly createProjectUseCase: CreateProjectService,
  ) {}
  @Get()
  async findAll() {
    try {
      return await this.getAllProjectsUseCase.execute(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.getProjectByIdUseCase.execute({
        userId,
        projectId: id,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      return await this.createProjectUseCase.execute({
        userId,
        project: createProjectDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
