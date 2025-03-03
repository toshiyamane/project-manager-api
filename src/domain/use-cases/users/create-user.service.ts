import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from 'src/domain/interfaces/user.interface';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
@Injectable()
export class CreateUserService implements BaseUseCase {
  constructor(private readonly usersRepository: UsersRepositoryService) {}
  async execute(user: CreateUserDto): Promise<IUser> {
    const createdUser = await this.usersRepository.add(user);
    if (!createdUser) {
      throw new Error('Usuário não pôde ser criado');
    }
    return createdUser;
  }
}
