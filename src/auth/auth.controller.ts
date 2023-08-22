import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum'
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('register')
    register(@Body() registerDto: registerDto) {
        return this.authService.register(registerDto)
    }

    @Get('profile')
    @Auth(Role.USER) // decorador general que tiene varios decoradores
    profile(@ActiveUser() user: UserActiveInterface) {
        console.log(user)
        return user
    }
}
