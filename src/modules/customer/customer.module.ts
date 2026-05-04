import { Module } from "@nestjs/common";
import { CustomerPrismaRepository } from "./repository/customer-prisma.repository";
import { PrismaModule } from "prisma/prisma.module";
import { CUSTOMER_REPOSITORY } from "./repository/customer.token";
import { PrismaService } from "prisma/prisma.service";

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: CUSTOMER_REPOSITORY,
            useFactory: (prisma: PrismaService) => new CustomerPrismaRepository(prisma),
            inject: [PrismaService],
        }
    ],
    exports: [CUSTOMER_REPOSITORY]
})
export class CustomerModule { }