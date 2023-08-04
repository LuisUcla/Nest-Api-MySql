import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Breed } from '../breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor( 
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>, // para usar los metodos de la DB MySql

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}


  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOne({ })

    if (!breed) {
      throw new BadRequestException('Breed not found')
    }
    
    return await this.catsRepository.save({
      ...createCatDto,
      breed
    });
    // return
  }

  async findAll() {
    return await this.catsRepository.find({});
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
   // return await this.catsRepository.update(id, updateCatDto)
    return
  }

  async remove(id: number) {
    // return await this.catsRepository.softDelete( id ) // elimina de forma logica
    return await this.catsRepository.delete(id); // elimina de forma fisica
  }
}
