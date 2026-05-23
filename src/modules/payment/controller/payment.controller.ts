import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role as RoleEnum } from "src/modules/users/entity/user.entity";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { PaymentService } from "../service/payment.service";

@UseGuards(RoleGuard)
@Role(RoleEnum.CUSTOMER)
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    create(
        @CurrentUser('sub') userId: string,
        @Body() data: CreatePaymentDto,
    ) {
        return this.paymentService.payByCustomer(userId, data);
    }
}
