import { BadRequestException, ConflictException, Inject, Injectable } from "@nestjs/common";
import type { IRentalRepository } from "../repository/rental.repository";
import { RENTAL_REPOSITORY } from "../repository/rental.token";
import { CarStatus, TCar } from "src/modules/car/entity/car.entity";
import { CAR_REPOSITORY } from "src/modules/car/repository/car.token";
import type { ICarRepository } from "src/modules/car/repository/car.repository";

@Injectable()
export class RentalAvailabilityService {
    constructor(
        @Inject(RENTAL_REPOSITORY)
        private rentalRepository: IRentalRepository,
        @Inject(CAR_REPOSITORY)
        private carRepository: ICarRepository
    ) { }

    async isCarAvailable(car: TCar, pickUpAt: Date, dropOffAt: Date): Promise<boolean> {
        if (pickUpAt >= dropOffAt) {
            return false;
        }

        if (car.status !== CarStatus.AVAILABLE) {
            return false;
        }

        const rentalOverlap = await this.rentalRepository.findOverlappingRental(car.id, pickUpAt, dropOffAt);
        return rentalOverlap.length === 0;
    }

    async findAvailableCars(pickUpAt: Date, dropOffAt: Date): Promise<TCar[]> {
        if (pickUpAt >= dropOffAt) {
            throw new BadRequestException("Pick-up date must be before drop-off date.");
        }

        const cars = await this.carRepository.findAll({
            page: 1,
            limit: 1000,
            carStatus: CarStatus.AVAILABLE
        });

        const availableCars: TCar[] = [];

        for (const car of cars.data) {
            if (await this.isCarAvailable(car, pickUpAt, dropOffAt)) {
                availableCars.push(car);
            }
        }
        
        return availableCars;
    }
}