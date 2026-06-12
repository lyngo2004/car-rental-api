import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CarStatus } from "../entity/car.entity";

export class CreateCarDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    carType: string;
    
    @IsString()
    color: string;

    @IsString()
    licensePlate: string;

    @IsNumber()
    manufactureYear: number;

    @IsNumber()
    pricePerHour: number;

    @IsNumber()
    capacity: number;

    @IsNumber()
    mileage: number;

    @IsEnum(CarStatus)
    status: CarStatus;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    imagePath?: string;

    @IsString()
    @IsOptional()
    publicImageId?: string;
}
