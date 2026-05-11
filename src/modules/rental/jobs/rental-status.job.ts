import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RENTAL_REPOSITORY } from "../repository/rental.token";
import type { IRentalRepository } from "../repository/rental.repository";
import { RentalStatus } from "../entity/rental.entity";

@Injectable()
export class RentalStatusJob {
    constructor(
        @Inject(RENTAL_REPOSITORY)
        private readonly rentalRepository: IRentalRepository
    ) { }

    private readonly logger = new Logger(RentalStatusJob.name)

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        await this.rentalRepository.updateToActive();
        await this.rentalRepository.updateToCompleted();

        this.logger.log(
            'Rental statuses updated successfully',
        );
    }
}