import { Injectable } from "@nestjs/common";
import { Payment as PrismaPayment, PaymentMethod as PrismaPaymentMethod, PaymentStatus as PrismaPaymentStatus } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { RentalStatus } from "src/modules/rental/entity/rental.entity";
import { PaymentMethod, PaymentStatus, TPayment } from "../entity/payment.entity";
import { IPaymentRepository, TCreatePayment } from "./payment.repository";

@Injectable()
export class PaymentPrismaRepository implements IPaymentRepository {
    constructor(private readonly prisma: PrismaService) { }

    toDomainPayment(payment: PrismaPayment): TPayment {
        return {
            ...payment,
            method: payment.method as PaymentMethod,
            status: payment.status as PaymentStatus,
        };
    }

    async findPaidByRentalId(rentalId: string): Promise<TPayment | null> {
        const payment = await this.prisma.payment.findFirst({
            where: {
                rentalId,
                status: 'COMPLETED' as PrismaPaymentStatus,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!payment) return null;

        return this.toDomainPayment(payment);
    }

    async createPaidAndUpdateRental(payment: TCreatePayment, rentalStatus: RentalStatus): Promise<TPayment> {
        const [createdPayment] = await this.prisma.$transaction([
            this.prisma.payment.create({
                data: {
                    ...payment,
                    method: payment.method as PrismaPaymentMethod,
                },
            }),
            this.prisma.rental.update({
                where: {
                    id: payment.rentalId,
                },
                data: {
                    rentalStatus,
                },
            }),
        ]);

        return this.toDomainPayment(createdPayment);
    }
}
