import { PrismaService } from "prisma/prisma.service";
import { IRentalRepository, TCreateRental, TQueryRental } from "./rental.repository";
import {
    Rental as PrismaRental,
    RentalStatus as PrismaRentalStatus,
    Prisma,
} from "@prisma/client";
import { RentalStatus, TRental } from "../entity/rental.entity";
import { Injectable } from "@nestjs/common";
import { TPaginationResult } from "src/common/types/pagination.type";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "src/common/constants/pagination.constant";

@Injectable()
export class RentalPrismaRepository implements IRentalRepository {
    constructor(private readonly prisma: PrismaService) { }

    toDomainRental(prismaRental: PrismaRental): TRental {
        return {
            ...prismaRental,
            rentalStatus: prismaRental.rentalStatus as RentalStatus,
        }
    }

    async findAllByCustomerId(customerId: string, query: TQueryRental): Promise<TPaginationResult<TRental>> {
        const {
            search,
            rentalStatus,
            pickUpLocation,
            dropOffLocation,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = DEFAULT_PAGE,
            limit = DEFAULT_LIMIT,
        } = query;

        const normalizedSearch = search?.trim().toLowerCase();
        const skip = (page - 1) * limit;

        const where: Prisma.RentalWhereInput = {
            customerId,
            rentalStatus,
            pickUpLocation,
            dropOffLocation,
            ...(normalizedSearch ? {
                OR: [
                    {
                        pickUpLocation: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                    },
                    {
                        dropOffLocation: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                    }
                ]
            } : {}),
        };

        const [total, rentals] = await Promise.all([
            this.prisma.rental.count({ where }),
            this.prisma.rental.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
        ])
        return {
            page,
            total,
            totalPage: Math.ceil(total / limit),
            data: rentals.map((r) => this.toDomainRental(r)),
        };
    }

    async findAll(query: TQueryRental): Promise<TPaginationResult<TRental>> {
        const {
            search,
            carId,
            employeeId,
            rentalStatus,
            pickUpLocation,
            dropOffLocation,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = DEFAULT_PAGE,
            limit = DEFAULT_LIMIT,
        } = query;

        const normalizedSearch = search?.trim().toLowerCase();
        const skip = (page - 1) * limit;
        const where: Prisma.RentalWhereInput = {
            carId,
            employeeId,
            rentalStatus,
            pickUpLocation,
            dropOffLocation,
            ...(normalizedSearch ? {
                OR: [
                    {
                        pickUpLocation: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                    },
                    {
                        dropOffLocation: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                    }
                ]
            } : {}),
        };

        const [total, rentals] = await Promise.all([
            this.prisma.rental.count({ where }),
            this.prisma.rental.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
        ])
        return {
            page,
            total,
            totalPage: Math.ceil(total / limit),
            data: rentals.map((r) => this.toDomainRental(r)),
        };
    }

    async findById(id: string): Promise<TRental | null> {
        const rental = await this.prisma.rental.findUnique({ where: { id } });
        if (!rental) return null;
        return this.toDomainRental(rental);
    }

    async create(rental: TCreateRental): Promise<TRental> {
        const createdRental = await this.prisma.rental.create({
            data: {
                ...rental,
                rentalStatus: rental.rentalStatus as PrismaRentalStatus,
            },
        });
        return this.toDomainRental(createdRental);
    }

    async update(id: string, data: Partial<TCreateRental>): Promise<TRental> {
        const updatedRental = await this.prisma.rental.update({
            where: { id },
            data: {
                ...data,
                rentalStatus: data.rentalStatus as PrismaRentalStatus,
            },
        });
        return this.toDomainRental(updatedRental);
    }
}