import { Injectable } from '@nestjs/common'; 
import { BaseUseCase } from '../base-use-case'; 
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service'; 
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto'; 
import { IUser } from 'src/domain/interfaces/user.interface'; 
import { hash } from 'bcrypt'; 
 
@Injectable() 
export class CreateUserService implements BaseUseCase { 
  private readonly DEFAULT_SALT_ROUNDS = 10; 
 
  constructor(private readonly usersRepository: UsersRepositoryService) {} 
 
  async execute(user: CreateUserDto): Promise<IUser> { 
    const hashedPassword = await hash(user.password, 
this.DEFAULT_SALT_ROUNDS); 
    const createdUser = await this.usersRepository.add({ 
      ...user, 
      password: hashedPassword, 
    }); 
 
    if (!createdUser) { 
      throw new Error('Usuário não pôde ser criado'); 
    } 
 
    return createdUser; 
  } 
}