import { PrismaService } from "prisma/prisma.service";
import { ICustomerRepository, TCreateCustomer } from "./customer.repository";
import { TCustomer } from "../entity/customer.entity";

export class CustomerPrismaRepository implements ICustomerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createCustomer(userId: string, customer: TCreateCustomer): Promise<TCustomer> {
        const createdCustomer = await this.prisma.customer.create({
            data: {
                ...customer,
                userId,
            },
            include: {
                user: true,
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