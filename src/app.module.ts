import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { GatewaysModule } from './gateways/gateways.module';
import { GetProjectByIdService } from './domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectService } from './domain/use-cases/projects/create-project.service';
import { GetAllTasksService } from './domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from './domain/use-cases/tasks/get-task-by-id.service';
import { CreateTaskService } from './domain/use-cases/tasks/create-task.service';
import { UpdateTaskService } from './domain/use-cases/tasks/update-task.service';
import { CreateUserService } from './domain/use-cases/users/create-user.service';
import { GetUserByIdService } from './domain/use-cases/users/get-user-by-id.service';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [DomainModule, InfrastructureModule, GatewaysModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    GetProjectByIdService,
    CreateProjectService,
    GetAllTasksService,
    GetTaskByIdService,
    CreateTaskService,
    UpdateTaskService,
    CreateUserService,
    GetUserByIdService,
  ],
})
export class AppModule {}
