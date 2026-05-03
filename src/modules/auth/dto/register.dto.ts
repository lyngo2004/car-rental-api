import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    driverLicense: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: string | null;
}