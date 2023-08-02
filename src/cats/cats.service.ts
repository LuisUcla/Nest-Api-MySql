import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CatsService {
  constructor( 
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat> // para usar los metodos de la DB MySql
  ) {}


  async create(createCatDto: CreateCatDto) {
    return await this.catsRepository.save(createCatDto);
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {}

  async remove(id: number) {
    // return await this.catsRepository.softDelete( id ) // elimina de forma logica
    return await this.catsRepository.delete(id); // elimina de forma fisica
  }
}
