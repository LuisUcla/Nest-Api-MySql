import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { dbConnect } from './config/mysql';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnect), // --> DB conection
    CatsModule, BreedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
