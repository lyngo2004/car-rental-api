import { TPaginationResult } from "../../../common/types/pagination.type";
import { CarStatus, TCar } from "../entity/car.entity";
export type TCreateCar = Omit<TCar, 'id' | 'createdAt' | 'updatedAt'>;
export type TUpdateCar = Partial<TCreateCar>;
export type TQueryCar = {
    search?: string;
    brand?: string;
    model?: string;
    carType?: string;
    color?: string;
    carStatus?: CarStatus;
    sortBy?: 'pricePerDay' | 'manufactureYear' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
};
export interface ICarRepository {
    findAll(query: TQueryCar): Promise<TPaginationResult<TCar>>;
    findById(id: string): Promise<TCar | null>;
    create(car: TCreateCar): Promise<TCar>;
    update(id: string, data: TUpdateCar): Promise<TCar>;
}
