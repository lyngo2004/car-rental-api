"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const pagination_constant_1 = require("../../../common/constants/pagination.constant");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let CarPrismaRepository = class CarPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toDomainCar(prismaCar) {
        return {
            ...prismaCar,
            status: prismaCar.status,
        };
    }
    async findAll(query) {
        const { search, brand, model, carType, color, sortBy = 'createdAt', sortOrder = 'desc', page = pagination_constant_1.DEFAULT_PAGE, limit = pagination_constant_1.DEFAULT_LIMIT, } = query;
        const normalizedSearch = search?.trim().toLowerCase();
        const skip = (page - 1) * limit;
        const where = {
            brand,
            model,
            carType,
            color,
            ...(normalizedSearch ? {
                OR: [
                    {
                        model: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                        brand: {
                            contains: normalizedSearch,
                            mode: 'insensitive',
                        },
                    }
                ],
            } : {}),
        };
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
        };
    }
    async findById(id) {
        const car = await this.prisma.car.findUnique({
            where: { id },
        });
        if (!car)
            return null;
        return this.toDomainCar(car);
    }
    async create(data) {
        const car = await this.prisma.car.create({
            data: {
                ...data,
                status: data.status,
            },
        });
        return this.toDomainCar(car);
    }
    async update(id, data) {
        const updatedCar = await this.prisma.car.update({
            where: { id },
            data: {
                ...data,
                status: data.status,
            }
        });
        return this.toDomainCar(updatedCar);
    }
};
exports.CarPrismaRepository = CarPrismaRepository;
exports.CarPrismaRepository = CarPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarPrismaRepository);
//# sourceMappingURL=car-prisma.repository.js.map