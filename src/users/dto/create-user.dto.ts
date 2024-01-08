
import {IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty() @Length(3, 10)
    name: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string; 

    @IsNotEmpty()
    avatar: string;
}
