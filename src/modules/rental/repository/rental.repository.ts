import { TPaginationResult } from "src/common/types/pagination.type";
import { RentalStatus, TRental } from "../entity/rental.entity";

export type TCreateRental = Omit<TRental, 'id' | 'createdAt' | 'updatedAt'>;
export type TUpdateRental = Partial<TCreateRental>;
export type TQueryRental = {
    search?: string;
    carId?: string;
    employeeId?: string;
    rentalStatus?: RentalStatus;
    pickUpLocation?: string;
    dropOffLocation?: string;
    sortBy?: 'pickUpAt' | 'dropOffAt' | 'createdAt' | 'totalAmount';
    sortOrder?: 'asc' | 'desc';

    page?: number;
    limit?: number;
}

export interface IRentalRepository {
    findAllByCustomerId(customerId: string, query: TQueryRental): Promise<TPaginationResult<TRental>>;
    findAll(query: TQueryRental): Promise<TPaginationResult<TRental>>;
    findById(id: string): Promise<TRental | null>;
    create(rental: TCreateRental): Promise<TRental>;
    update(id: string, data: TUpdateRental): Promise<TRental>;
}
