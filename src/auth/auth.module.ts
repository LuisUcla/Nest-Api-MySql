import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, // --> para usar los metodos del servicio de user
    JwtModule.register({
      global: true,
      secret: 'secret: no utitlizar en prod', // llave del token, debe estar en el .env
      signOptions: { expiresIn: '1d' },
    }),], 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
