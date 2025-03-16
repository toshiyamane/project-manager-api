import { Module } from '@nestjs/common'; 
import { JwtModule } from '@nestjs/jwt'; 
import { jwtConstants } from './constants'; 
import { UsersModule } from 'src/domain/use-cases/users/users.module'; 
import { AuthService } from './auth.service'; 
 
@Module({ 
  imports: [ 
    UsersModule, 
    JwtModule.register({ 
      global: true, 
      secret: jwtConstants.secret, 
      signOptions: { expiresIn: '60m' }, 
    }), 
  ], 
  providers: [AuthService], 
  exports: [AuthService], 
}) 
export class AuthModule {} 