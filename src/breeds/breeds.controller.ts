import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';

@Controller('breeds')
@Auth(Role.ADMIN) // middleware donde el usuario admin es el que hacen las operaciones de los 'breeds'
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.breedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(+id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedsService.remove(+id);
  }
}
