import { Module } from "@nestjs/common";
import { RENTAL_REPOSITORY } from "./repository/rental.token";
import { PersistenceModule } from "../persistence/persistence.module";
import { CustomerModule } from "../customer/customer.module";
import { EmployeeModule } from "../employee/employee.module";
import { RentalController } from "./controller/rental.controller";
import { RentalService } from "./service/rental.service";
import { UserModule } from "../users/user.module";
import { AdminRentalController } from "./controller/admin-rental.controller";
import { RentalAvailabilityModule } from './rental-availability.module';
import { RentalPrismaRepository } from "./repository/rental-prisma.repository";

@Module({
    imports: [
        PersistenceModule,
        CustomerModule,
        EmployeeModule,
        UserModule,
        RentalAvailabilityModule,
    ],
    controllers: [RentalController, AdminRentalController],
    providers: [
        RentalService,
        {
            provide: RENTAL_REPOSITORY,
            useClass: RentalPrismaRepository,
        }
    ],
    exports: [RENTAL_REPOSITORY]
})
export class RentalModule { }
