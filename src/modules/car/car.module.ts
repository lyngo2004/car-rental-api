import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarPrismaRepository } from './repository/car-prisma.repository';
import { CAR_REPOSITORY } from './repository/car.token';
import { UserModule } from '../users/user.module';
import { RentalAvailabilityService } from '../rental/service/rental-availability.service';
import { RENTAL_REPOSITORY } from '../rental/repository/rental.token';
import { RentalPrismaRepository } from '../rental/repository/rental-prisma.repository';

@Module({
  imports: [UserModule],
  controllers: [CarController],
  providers: [
    CarService,
    {
      provide: CAR_REPOSITORY,
      useClass: CarPrismaRepository,
    },
    {
      provide: RENTAL_REPOSITORY,
      useClass: RentalPrismaRepository,
    },
    RentalAvailabilityService,
  ],
  exports: [CAR_REPOSITORY]
})
export class CarModule { }
