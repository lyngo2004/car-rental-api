import { Controller, Get, NotFoundException } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CustomerService } from "./customer.service";

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('me')
    async getMe(@CurrentUser('sub') userId: string) {
        const customer = await this.customerService.findByUserId(userId);

        if (!customer) {
            throw new NotFoundException('Customer profile not found');
        }

        return {
            id: customer.id,
            userId: customer.userId,
            email: (customer as any).user?.email,
            fullName: customer.fullName,
            phone: customer.phone,
            address: customer.address,
            identityNum: customer.identityNum,
            driverLicense: customer.driverLicense,
            dateOfBirth: customer.dateOfBirth,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        };
    }
}
