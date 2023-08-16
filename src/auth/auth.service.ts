import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { registerDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    async register({email, name, password}: registerDto) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists...')
        }

        return await this.userService.create({
            email, 
            name,
            password: await bcryptjs.hash(password, 10)
        })
    }

    async login({email, password}: LoginDto) {
        // ver si poner try catch
        const user = await this.userService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Email is wrong...');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is wrong...');
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload); // firmar el token con los valores

        return {
            user,
            token
        }
    }
}
