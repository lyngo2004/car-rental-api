import { IsEnum, IsString } from "class-validator";
import { PaymentMethod } from "../entity/payment.entity";

export class CreatePaymentDto {
    @IsString()
    rentalId: string;

    @IsEnum(PaymentMethod)
    method: PaymentMethod;
}
