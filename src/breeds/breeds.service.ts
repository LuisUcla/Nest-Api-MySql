import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    const breed = await this.breedRepository.findOneBy({ name: createBreedDto.name });

    if (breed) {
      throw new ConflictException('Breed already exists...')
    }
    return await this.breedRepository.save(createBreedDto)
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number, user: UserActiveInterface) {
    const breed = await this.breedRepository.findOneBy({ id })

    if (!breed) {
      throw new BadRequestException('Breed not found...')
    }

    this.validateOwnership(user); // validacion

    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  async remove(id: number) {
    return `This action removes a #${id} breed`;
  }

  private validateOwnership(user: UserActiveInterface) {
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException('No Authorize...')
    }
  }
}
