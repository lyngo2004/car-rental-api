import { CarStatus } from "../entity/car.entity";
export declare class CreateCarDto {
    brand: string;
    model: string;
    carType: string;
    color: string;
    licensePlate: string;
    manufactureYear: number;
    pricePerDay: number;
    capacity: number;
    mileage: number;
    status: CarStatus;
    description?: string;
    imagePath?: string;
    publicImageId?: string;
}
