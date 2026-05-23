import { Module } from "@nestjs/common";
import { CustomerModule } from "../customer/customer.module";
import { RentalModule } from "../rental/rental.module";
import { UserModule } from "../users/user.module";
import { PaymentController } from "./controller/payment.controller";
import { PaymentPrismaRepository } from "./repository/payment-prisma.repository";
import { PAYMENT_REPOSITORY } from "./repository/payment.token";
import { PaymentService } from "./service/payment.service";

@Module({
    imports: [
        CustomerModule,
        RentalModule,
        UserModule,
    ],
    controllers: [PaymentController],
    providers: [
        PaymentService,
        {
            provide: PAYMENT_REPOSITORY,
            useClass: PaymentPrismaRepository,
        },
    ],
})
export class PaymentModule { }
