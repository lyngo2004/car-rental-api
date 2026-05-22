import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CAR_REPOSITORY } from '../car/repository/car.token';
import { RENTAL_REPOSITORY } from '../rental/repository/rental.token';
import { CarPrismaRepository } from '../car/repository/car-prisma.repository';
import { RentalPrismaRepository } from '../rental/repository/rental-prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CAR_REPOSITORY,
      useClass: CarPrismaRepository,
    },
    {
      provide: RENTAL_REPOSITORY,
      useClass: RentalPrismaRepository,
    },
  ],
  exports: [CAR_REPOSITORY, RENTAL_REPOSITORY],
})
export class PersistenceModule {}
