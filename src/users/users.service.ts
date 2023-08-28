import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find()
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  findOneByEmailWithPassword(email: string) { // para usar solo en el login
    return this.userRepository.findOne({ 
      where: { email },
      select: ['email', 'password', 'role'] // datos que se devuelven en la peticion
    })
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new BadRequestException('User not found...')
    }
    
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
