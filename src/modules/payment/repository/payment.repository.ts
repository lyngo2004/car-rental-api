import { RentalStatus } from "src/modules/rental/entity/rental.entity";
import { PaymentMethod, PaymentStatus, TPayment } from "../entity/payment.entity";

export type TCreatePayment = {
    rentalId: string;
    amount: number;
    method: PaymentMethod;
    paymentDate?: Date | null;
    status?: PaymentStatus;
}

export interface IPaymentRepository {
    findPaidByRentalId(rentalId: string): Promise<TPayment | null>;
    createPaidAndUpdateRental(payment: TCreatePayment, rentalStatus: RentalStatus): Promise<TPayment>;
}
