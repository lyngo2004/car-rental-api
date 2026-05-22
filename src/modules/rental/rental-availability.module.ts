import { Module } from '@nestjs/common';
import { RentalAvailabilityService } from './service/rental-availability.service';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  providers: [RentalAvailabilityService],
  exports: [RentalAvailabilityService],
})
export class RentalAvailabilityModule {}
