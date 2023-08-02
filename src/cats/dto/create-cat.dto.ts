import { IsString, MinLength, IsInt, IsPositive, IsOptional, IsNotEmpty } from "class-validator"

export class CreateCatDto { // validadores de datos

    @IsString()
    @MinLength(3)
    @IsNotEmpty() // no puede ser vacio
    name: string

    @IsInt()
    @IsPositive()
    age: number

    @IsString()
    @IsOptional()
    breed: string
}
