import { IsDateString, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    fullName: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    driverLicense: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: string | null;
}