import { Module } from "@nestjs/common";
import { CustomerPrismaRepository } from "./repository/customer-prisma.repository";

@Module({
    providers: [
        {
            provide: 'CUSTOMER_REPOSITORY',
            useClass: CustomerPrismaRepository,
        }
    ],
    exports: ['CUSTOMER_REPOSITORY']
})
export class CustomerModule { }