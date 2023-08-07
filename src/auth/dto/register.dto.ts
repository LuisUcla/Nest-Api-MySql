import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class registerDto {

    @IsNotEmpty() // no vacio obligatorio
    @IsString()
    name: string

    @IsString()
    @IsEmail() // validacion de email
    email: string
    
    @Transform(({value}) => value.trim()) // para que no hayan espacios en la contrasenna
    @IsString()
    @MinLength(6)
    password: string
}