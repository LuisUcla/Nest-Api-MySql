import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule) ], //cuando es dependencias circulares 
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // se exporta para usar en AuthService
})
export class UsersModule {}
