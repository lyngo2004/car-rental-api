import { IsEnum, IsOptional, IsString } from "class-validator";
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

    @IsString()
    manufactureYear: number;

    @IsString()
    pricePerDay: number;

    @IsString()
    capacity: number;

    @IsString()
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
