import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // --> para usar los metodos del servicio de user
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // llave del token, debe estar en el .env
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    })], 
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule] // se exporta para usar en los demas modulos que usan AuthModule
})
export class AuthModule {}
