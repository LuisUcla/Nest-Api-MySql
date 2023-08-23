import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from './entities/cat.entity';
import { BreedsModule } from '../breeds/breeds.module';
import { AuthModule } from '../auth/auth.module';

// BreedsModule para usar los metodos
// de Breed en catService
@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule, AuthModule],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
