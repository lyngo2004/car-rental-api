import { IsNotEmpty, IsString } from "class-validator";

export class RegisterResult {
    userId: string;
    id: string;
    email: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    phone: string;
    address: string;
    driverLicense: string;
    dateOfBirth: Date | null;
}