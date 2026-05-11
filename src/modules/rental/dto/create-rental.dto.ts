import { IsDateString, IsString } from "class-validator";

export class CreateRentalDto {
    @IsString()
    carId: string;

    @IsDateString()
    pickUpAt: string;

    @IsDateString()
    dropOffAt: string;

    @IsString()
    pickUpLocation: string;

    @IsString()
    dropOffLocation: string;
}