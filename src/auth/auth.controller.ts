import { Controller, Post, Body, Res, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

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

    // @Get('profile')
    // @UseGuards(AuthGuard) // middleware
    // profile(@Request() req) {
    //     console.log(req.user)
    //     return req.user
    // }
}
