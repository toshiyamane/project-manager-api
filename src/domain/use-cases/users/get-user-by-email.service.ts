import { Injectable } from '@nestjs/common'; 
import { IUser } from 'src/domain/interfaces/user.interface'; 
import { UsersRepositoryService } from 
'src/infrastructure/database/repositories/users.repository.service'; 
 
@Injectable() 
export class GetUserByEmailService { 
  constructor(private readonly usersRepository: UsersRepositoryService) {} 
 
  async execute(email: string): Promise<IUser> { 
    const user = await this.usersRepository.findByEmail(email); 
 
    if (!user) { 
      throw new Error('Usuário não encontrado'); 
    } 
 
    return user; 
  } 
} 