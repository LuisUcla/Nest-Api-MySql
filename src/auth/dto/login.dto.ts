import { IsEmail, MinLength, IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}