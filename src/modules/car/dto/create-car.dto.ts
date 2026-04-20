import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CarStatus } from "../entity/car.entity";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @IsString()
    @IsNotEmpty()
    carType!: string;
    
    @IsString()
    @IsNotEmpty()
    color!: string;

    @IsString()
    @IsNotEmpty()
    licensePlate!: string;

    @IsString()
    @IsNotEmpty()
    manufactureYear!: number;

    @IsString()
    @IsNotEmpty()
    pricePerDay!: number;

    @IsString()
    @IsNotEmpty()
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    mileage!: number;

    @IsEnum(CarStatus)
    @IsNotEmpty()
    status!: CarStatus;

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
