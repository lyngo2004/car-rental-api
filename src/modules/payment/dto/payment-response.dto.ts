import { PaymentStatus, TPayment } from "../entity/payment.entity";

export class PaymentResponseDto {
    paymentId: string;
    rentalId: string;
    status: PaymentStatus;
    amount: number;
    method: string;
    paidAt?: string;

    static fromEntity(payment: TPayment): PaymentResponseDto {
        const dto = new PaymentResponseDto();
        dto.paymentId = payment.id;
        dto.rentalId = payment.rentalId;
        dto.status = payment.status;
        dto.amount = payment.amount;
        dto.method = payment.method;
        if (payment.paymentDate) {
            dto.paidAt = payment.paymentDate.toISOString();
        }
        return dto;
    }
}
