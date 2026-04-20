import { TCar } from "../entity/car.entity";
import { ICarRepository, TCreateCar, TQueryCar, TUpdateCar } from "./car.repository";
import { Car as PrismaCar } from "@prisma/client";
import { TPaginationResult } from "../../../common/types/pagination.type";
import { PrismaService } from "../../../../prisma/prisma.service";
export declare class CarPrismaRepository implements ICarRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    toDomainCar(prismaCar: PrismaCar): TCar;
    findAll(query: TQueryCar): Promise<TPaginationResult<TCar>>;
    findById(id: string): Promise<TCar | null>;
    create(data: TCreateCar): Promise<TCar>;
    update(id: string, data: TUpdateCar): Promise<TCar>;
}
