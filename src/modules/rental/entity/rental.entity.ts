export type TRental = {
    id: string;
    rentalStatus: RentalStatus;

    pickUpAt: Date;
    dropOffAt: Date;

    pickUpLocation: string;
    dropOffLocation: string;

    totalAmount: number;

    carId: string;
    customerId: string;
    employeeId: string | null;

    createdAt: Date;
    updatedAt: Date;
}

export enum RentalStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}