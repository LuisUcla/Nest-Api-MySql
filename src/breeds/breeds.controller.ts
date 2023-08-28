import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Breed } from './entities/breed.entity';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@ApiTags('Breeds') // docs
@ApiBearerAuth() // docs
@ApiUnauthorizedResponse({ description: 'Para usar este endponit debe estar previamente logueado' }) // docs
@Auth(Role.ADMIN) // middleware donde el usuario admin es el que hacen las operaciones de los 'breeds'
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @ApiCreatedResponse({ // response create 201
    description: 'The breed has been successfully created.',
    schema: {
      properties: {
        id: { type: 'integer'},
        name: { type: 'string' }
      }
    }
  })
  @ApiBody({ description: 'Estructura del object a enviar', type: CreateBreedDto })
  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.breedsService.findOne(id, user);
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
