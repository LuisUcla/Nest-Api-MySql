import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Breed } from '../breeds/entities/breed.entity';
import { Role } from '../common/enums/rol.enum';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Injectable()
export class CatsService {
  constructor( 
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>, // para usar los metodos de la DB MySql

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>  // para usar los metodos de la tabla breed
  ) {}


  async create(createCatDto: CreateCatDto, user: UserActiveInterface) { // user es el que viene desde el token
    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catsRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.catsRepository.find();
    }

    return await this.catsRepository.find({
      where: { userEmail: user.email }
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catsRepository.findOneBy({ id })

    if (!cat) {
      throw new BadRequestException('Cat not found...')
    }

    this.validateOwnership(cat, user); // validacion

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    await this.findOne(id, user) // validar

    return await this.catsRepository.update(id, {
      ...updateCatDto, 
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined, 
      userEmail: user.email
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user) // para validar
    return await this.catsRepository.softDelete( id ) // elimina de forma logica
    //return await this.catsRepository.delete(id); // elimina de forma fisica
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException('No Authorize...')
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });

    if (!breedEntity) {
      throw new BadRequestException('Breed not found...')
    }

    return breedEntity;
  }
}
