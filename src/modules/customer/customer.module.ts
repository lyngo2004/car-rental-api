import { Module } from "@nestjs/common";
import { CustomerPrismaRepository } from "./repository/customer-prisma.repository";
import { PrismaModule } from "prisma/prisma.module";
import { CUSTOMER_REPOSITORY } from "./repository/customer.token";
import { PrismaService } from "prisma/prisma.service";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";

@Module({
    imports: [PrismaModule],
    controllers: [CustomerController],
    providers: [
        {
            provide: CUSTOMER_REPOSITORY,
            useFactory: (prisma: PrismaService) => new CustomerPrismaRepository(prisma),
            inject: [PrismaService],
        },
        CustomerService,
    ],
    exports: [CUSTOMER_REPOSITORY, CustomerService]
})
export class CustomerModule { }
