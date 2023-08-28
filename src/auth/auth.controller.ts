import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum'
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
//import { User } from '../users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    /* =============== Docs ================== */
    @ApiCreatedResponse({ 
        description: 'user successfully logged in', 
        schema: {
            properties: {
                email: { type: 'string', example: 'user@user.com' },
                role: { type: 'string', example: 'user' },
                token: { type: "string" }
            }
        }
    })
    @ApiNotFoundResponse({ 
        description: 'Email is wrong...',
        schema: {
            properties: {
                message: { type: 'string', example: 'Email is wrong' },
                error: { type: 'string', example: 'Not Found' },
                statusCode: { type: 'number', example: '404' }
            }
        } 
    })
    @ApiUnauthorizedResponse({
        description: 'Password is wrong...',
        schema: {
            properties: {
                message: { type: 'string', example: 'Password is wrong...' },
                error: { type: 'string', example: 'Unauthorized' },
                statusCode: { type: 'number', example: '401' }
            }
        } 
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            properties: {
                message: { type: 'array',  
                    items: {
                        type: 'string',
                        example: 'email must be an email',
                    },
                },
                error: { type: 'string', example: 'Unauthorized' },
                statusCode: { type: 'number', example: '400' }
            }
        } 
    })
    @ApiOperation({ 
        summary: 'Log user',
        description: 'Logs user into the system' 
    })
    /* =============== Docs ================== */
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

     /* =============== Docs ================== */
    @ApiCreatedResponse({ 
        description: 'user successfully logged in',
        //type: User
        schema: {
            properties: {
                id: { type: 'number', example: '1' },
                email: { type: 'string', example: 'user@user.com' },
                name: { type: 'string', example: 'user' },
                password: { type: 'string', example: "$2a$10$adCuEiUzymq5vrqMsMoSP.bSb36DyrDIBUrRF0ovE2vS8M5xlfH/O" },
                deletedAt: { example: 'null' },
                role: { type: 'string', example: 'user' }
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            properties: {
                message: { type: 'array',  
                    items: {
                        type: 'string',
                        example: 'name should not be empty',
                    },
                },
                error: { type: 'string', example: 'Bad Request' },
                statusCode: { type: 'number', example: '400' }
            }
        } 
    })
    @ApiConflictResponse({
        description: 'Conflict',
        schema: {
            properties: {
                message: { type: 'string', example: 'User already exists...' },
                error: { type: 'string', example: 'Conflict' },
                statusCode: { type: 'number', example: '409' }
            }
        } 
    })
    @ApiOperation({ 
        summary: 'Create user',
        description: 'Created a new user into the system.' 
    })
    /* =============== Docs ================== */
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
