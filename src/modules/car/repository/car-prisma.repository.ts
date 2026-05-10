import { CarStatus, TCar } from "../entity/car.entity";
import { ICarRepository, TCreateCar, TQueryCar, TUpdateCar } from "./car.repository";
import { Injectable } from "@nestjs/common";
import {
  Car as PrismaCar,
  CarStatus as PrismaCarStatus,
  Prisma
} from "@prisma/client";
import { TPaginationResult } from "../../../common/types/pagination.type";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../../../common/constants/pagination.constant";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class CarPrismaRepository implements ICarRepository {
  constructor(private readonly prisma: PrismaService) { }

  toDomainCar(prismaCar: PrismaCar): TCar {
    return {
      ...prismaCar,
      status: prismaCar.status as CarStatus,
    };
  }

  async findAll(query: TQueryCar): Promise<TPaginationResult<TCar>> {
    const {
      search,
      brand,
      model,
      carType,
      color,
      carStatus,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
    } = query;

    const normalizedSearch = search?.trim().toLowerCase();
    const skip = (page - 1) * limit;

    const where: Prisma.CarWhereInput = {
      brand,
      model,
      carType,
      color,
      status: carStatus,
      ...(normalizedSearch ? {
        OR: [
          {
            model: {
              contains: normalizedSearch,
              mode: 'insensitive',
            },
          },
          {
            brand: {
              contains: normalizedSearch,
              mode: 'insensitive',
            },
          }
        ],
      } : {}),
    }

    const [total, cars] = await Promise.all([
      this.prisma.car.count({ where }),
      this.prisma.car.findMany({
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
    ]);

    return {
      page,
      total,
      totalPage: Math.ceil(total / limit),
      data: cars.map((car) => this.toDomainCar(car)),
    }
  }

  async findById(id: string): Promise<TCar | null> {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) return null;

    return this.toDomainCar(car);
  }

  async create(data: TCreateCar): Promise<TCar> {
    const car = await this.prisma.car.create({
      data: {
        ...data,
        status: data.status as PrismaCarStatus,
      },
    });

    return this.toDomainCar(car);
  }

  async update(id: string, data: TUpdateCar): Promise<TCar> {
    const updatedCar = await this.prisma.car.update({
      where: { id },
      data: {
        ...data,
        status: data.status as PrismaCarStatus,
      }
    });

    return this.toDomainCar(updatedCar);
  }
}
