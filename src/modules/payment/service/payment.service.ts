import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CUSTOMER_REPOSITORY } from "src/modules/customer/repository/customer.token";
import type { ICustomerRepository } from "src/modules/customer/repository/customer.repository";
import { RENTAL_REPOSITORY } from "src/modules/rental/repository/rental.token";
import type { IRentalRepository } from "src/modules/rental/repository/rental.repository";
import { RentalStatus } from "src/modules/rental/entity/rental.entity";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { PaymentResponseDto } from "../dto/payment-response.dto";
import { PAYMENT_REPOSITORY } from "../repository/payment.token";
import type { IPaymentRepository } from "../repository/payment.repository";

@Injectable()
export class PaymentService {
    constructor(
        @Inject(PAYMENT_REPOSITORY)
        private readonly paymentRepository: IPaymentRepository,
        @Inject(RENTAL_REPOSITORY)
        private readonly rentalRepository: IRentalRepository,
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository,
    ) { }

    async payByCustomer(userId: string, dto: CreatePaymentDto): Promise<PaymentResponseDto> {
        const customer = await this.customerRepository.findByUserId(userId);
        if (!customer) {
            throw new UnauthorizedException('Customer not found');
        }

        const rental = await this.rentalRepository.findById(dto.rentalId);
        if (!rental) {
            throw new NotFoundException('Rental not found');
        }

        if (rental.customerId !== customer.id) {
            throw new ForbiddenException('Can only pay your own rental');
        }

        if (rental.rentalStatus !== RentalStatus.APPROVED) {
            throw new BadRequestException('Only approved rentals can be paid');
        }

        const existingPaidPayment = await this.paymentRepository.findPaidByRentalId(rental.id);
        if (existingPaidPayment) {
            throw new ConflictException('Rental has already been paid');
        }

        const payment = await this.paymentRepository.createPaidAndUpdateRental(
            {
                rentalId: rental.id,
                amount: rental.totalAmount,
                method: dto.method,
                paymentDate: new Date(),
                status: 'COMPLETED' as any,
            },
            RentalStatus.COMPLETED,
        );

        return PaymentResponseDto.fromEntity(payment);
    }
}
