export type TPayment = {
    id: string;
    amount: number;
    paymentDate: Date | null;
    method: PaymentMethod;
    status: PaymentStatus;
    rentalId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum PaymentMethod {
    CASH = 'CASH',
    CARD = 'CARD',
    TRANSFER = 'TRANSFER',
    FAKE_CARD = 'FAKE_CARD',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}
