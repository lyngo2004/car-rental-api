import { PrismaClientOrTx } from "prisma/prisma.service";
import { ICustomerRepository, TCreateCustomer } from "./customer.repository";
import { TCustomer } from "../entity/customer.entity";

export class CustomerPrismaRepository implements ICustomerRepository {
    constructor(private readonly prisma: PrismaClientOrTx) { }

    async createCustomer(userId: string, customer: TCreateCustomer): Promise<TCustomer> {
        const createdCustomer = await this.prisma.customer.create({
            data: {
                userId,
                fullName: customer.fullName,
                phone: customer.phone,
                address: customer.address,
                identityNum: customer.identityNum,
                driverLicense: customer.driverLicense,
                dateOfBirth: customer.dateOfBirth ?? null,
            },
        });
        return createdCustomer;
    }

    async findById(id: string): Promise<TCustomer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
        return customer ? (customer) : null;
    }

    async findByUserId(userId: string): Promise<TCustomer | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { userId },
            include: {
                user: true,
            },
        });
        return customer ? (customer) : null;
    }
}
