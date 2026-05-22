import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarPrismaRepository } from './repository/car-prisma.repository';
import { CAR_REPOSITORY } from './repository/car.token';
import { UserModule } from '../users/user.module';
import { RentalAvailabilityModule } from '../rental/rental-availability.module';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [UserModule, PersistenceModule, RentalAvailabilityModule],
  controllers: [CarController],
  providers: [
    CarService,
    {
      provide: CAR_REPOSITORY,
      useClass: CarPrismaRepository,
    },
  ],
  exports: [CAR_REPOSITORY]
})
export class CarModule { }
