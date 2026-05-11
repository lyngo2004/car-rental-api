import { Module } from "@nestjs/common";
import { CarModule } from "../car/car.module";
import { RENTAL_REPOSITORY } from "./repository/rental.token";
import { RentalPrismaRepository } from "./repository/rental-prisma.repository";
import { CustomerModule } from "../customer/customer.module";
import { EmployeeModule } from "../employee/employee.module";
import { RentalController } from "./controller/rental.controller";
import { RentalService } from "./service/rental.service";
import { UserModule } from "../users/user.module";
import { AdminRentalController } from "./controller/admin-rental.controller";
import { RentalAvailabilityService } from "./service/rental-availability.service";

@Module({
    imports: [
        CarModule,
        CustomerModule,
        EmployeeModule,
        UserModule
    ],
    controllers: [RentalController, AdminRentalController],
    providers: [
        RentalService,
        RentalAvailabilityService,
        {
            provide: RENTAL_REPOSITORY,
            useClass: RentalPrismaRepository,
        }
    ],
    exports: [RENTAL_REPOSITORY]
})
export class RentalModule { }
