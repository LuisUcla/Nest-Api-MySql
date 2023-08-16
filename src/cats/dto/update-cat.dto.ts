import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    // @IsString()
    // @MinLength(3)
    // @IsNotEmpty() // no puede ser vacio
    // @IsOptional() 
    // name?: string

    // @IsInt()
    // @IsPositive()
    // @IsOptional()
    // age?: number

    // @IsString()
    // @IsOptional()
    // breed?: string
}
