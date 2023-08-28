import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiProperty, ApiPropertyOptional, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags("Cats") // docs
@ApiBearerAuth() // docs
@ApiUnauthorizedResponse({ description: 'Para usar este endponit debe estar previamente logueado' }) // docs
@Auth(Role.USER) // middleware general (se puede hacer metodo a metodo)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  
  @ApiBody({
    description: 'The "breed" is selected of a breed list in the form',
    type: CreateCatDto,
    // schema: {
    //   properties: {
    //     name: { example: 'Cat name' },
    //     age: { example: '1'},
    //     breed: { example: 'Bambino' }
    //   }
    // }
  })
  @ApiCreatedResponse({ 
    description: 'The cat has been successfully created.', 
    schema: {
      properties: {
        id: { example: 1 },
        name: { example: 'Cat name' },
        age: { example: '4' }, 
        breed: { 
          properties: {
            id: { type: 'integer', example: '3' },
            name: { example: 'Bambino' }
          }
        },
        userEmail: { example: 'user@user.com' },
        deletedAt: { example: 'null' },
        isActive: { type: 'boolean', example: 'true' }
      }
    } 
  })
  @ApiBadRequestResponse({ 
    description: 'Bad request example: name is not empty or breed not found' 
  })
  @ApiOperation({ 
    summary: 'Create new cat', 
    description: 'Create a new Cat in the database' 
  })
  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user);
  }

  @ApiQuery({ name: 'isActive', enum: ['true', 'false'] })
  @Get('active')
  getDeleted(@Query('isActive') isActive: boolean, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAllDeleted(isActive, user)
  }

  @ApiOperation({ 
    summary: 'Gets all cats', 
    description: 'If the user role is "user", a filtered list of cats of that user is obtained, otherwise, all cats are obtained in a general way.' 
  })
  @ApiOkResponse({ 
    description: 'Cats list..',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { example: 1 },
          name: { example: 'Cat name' },
          age: { example: 4},
          isActive: { example: true},
          deletedAt: { example: null },
          userEmail: { example: "user@user.com"},
          breed: {
            properties: {
              id:{ example: 3 },
              name: { example: "Bambino" }
            }
          }
  
        },
      }
    }
  })
  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAll(user);
  }

 

  @ApiOperation({ 
    summary: "Find Cat by id", 
    description: "If the user role is 'user' and if the consulted cat does not belong to this user, it returns unauthorized " 
  }) // docs
  @ApiParam({ 
    name: 'id', 
    type: 'integer', 
    description: 'Id de cat' 
  })
  @ApiOkResponse({ 
    description: 'operation successful get Cat',
    schema: {
      properties: {
        id: { example: 1 },
        name: { example: 'Cat name' },
        age: { example: 4},
        isActive: { example: true },
        deletedAt: { example: null },
        userEmail: { example: "user@user.com"},
        breed: {
          properties: {
            id:{ example: 3 },
            name: { example: "Bambino" }
          }
        }

      },
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No Authorize...' 
  })
  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  

  @ApiOperation({ 
    summary: 'Update Cat', 
    description: 'To edit, you must pass the valid id or one that exists in the database through path. Breed must exist in the database' 
  })
  @ApiOkResponse({ 
    description: 'Cat Update... (if affected == 1) Indicates the number of objects updated',
    schema: {
      properties: {
        generatedMaps: { type: 'array', example: [] },
        raw: { type: 'array', example: [] },
        affected: { type: 'number', example: 1 }
      }
    }
  })
  @ApiParam({ 
    name: 'id',
    type: 'integer', 
    description: 'Id de cat'
  })
  @ApiBadRequestResponse({ 
    description: 'Error in "id" consulting' 
  })
  @ApiNotFoundResponse({ 
    description: '"Cat" or "breed" not found' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No Authorize... The cat must be in the list of the logged in user' 
  })
  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateCatDto: UpdateCatDto, 
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.catsService.update(id, updateCatDto, user);
  }

  

  @ApiOperation({ 
    summary: 'Delete Cat', 
    description: 'This operation verifies that the cat to be deleted is in the user cat list, otherwise it will be unauthorized' 
  })
  @ApiParam({ 
    name: 'id', 
    type: 'integer', 
    description: 'Id de cat (It must be in the database otherwise it will give a search error)' 
  })
  @ApiOkResponse({ 
    description: 'Cat deleted... (if affected == 1) Indicates the number of objects deleted',
    schema: {
      properties: {
        generatedMaps: { type: 'array', example: [] },
        raw: { type: 'array', example: [] },
        affected: { type: 'number', example: 1 }
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid ID supplied' 
  })
  @ApiNotFoundResponse({ 
    description: '"Cat" not found' 
  })
  @ApiUnauthorizedResponse({ 
    description: 'No Authorize... The cat must be in the list of the logged in user' 
  })
  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }  
}
