import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role as RoleEnum } from 'src/modules/users/entity/user.entity';
import { CreateRentalDto } from "../dto/create-rental.dto";
import { RentalService } from "../service/rental.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { UpdateRentalDto } from "../dto/update-rental.dto";

@UseGuards(RoleGuard)
@Role(RoleEnum.CUSTOMER)
@Controller('rentals')
export class RentalController {
    constructor(private readonly rentalService: RentalService) { }

    @Post()
    create(
        @CurrentUser('sub') userId: string,
        @Body() data: CreateRentalDto) {
        return this.rentalService.createByCustomer(userId, data);
    }

    @Get()
    findAll(
        @CurrentUser('sub') userId: string
    ) {
        return this.rentalService.findAllByCustomer(userId);
    }

    @Patch(':id')
    update(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
        @Body() data: UpdateRentalDto
    ) {
        return this.rentalService.updateByCustomer(rentalId, userId, data);
    }

    @Patch(':id')
    cancel(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
    ) {
        return this.rentalService.cancelRentalByCustomer(rentalId, userId);
    }
}