import { TRental } from "../entity/rental.entity";

export class RentalResponseDto {
    id: string;
    carId: string;
    customerId: string;
    employeeId: string | null;
    rentalStatus: string;
    pickUpAt: string;
    dropOffAt: string;
    pickUpLocation: string;
    dropOffLocation: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;

    static fromEntity(rental: TRental): RentalResponseDto {
        const dto = new RentalResponseDto();
        dto.id = rental.id;
        dto.carId = rental.carId;
        dto.customerId = rental.customerId;
        dto.employeeId = rental.employeeId;
        dto.rentalStatus = rental.rentalStatus;
        dto.pickUpAt = rental.pickUpAt.toISOString();
        dto.dropOffAt = rental.dropOffAt.toISOString();
        dto.pickUpLocation = rental.pickUpLocation;
        dto.dropOffLocation = rental.dropOffLocation;
        dto.totalAmount = rental.totalAmount;
        dto.createdAt = rental.createdAt.toISOString();
        dto.updatedAt = rental.updatedAt.toISOString();
        return dto;
    }
}
