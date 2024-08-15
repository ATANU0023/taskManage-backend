import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class SignupDto {
    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}