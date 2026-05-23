import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role as RoleEnum } from "src/modules/users/entity/user.entity";
import { RentalService } from "../service/rental.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { EmployeeCreateRentalDto } from "../dto/employee-create-rental.dto";
import { UpdateRentalDto } from "../dto/update-rental.dto";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

@UseGuards(RoleGuard)
@Role(RoleEnum.EMPLOYEE)
@Controller('admin/rentals')
export class AdminRentalController {
    constructor(
        private readonly rentalService: RentalService
    ) { }

    @Post()
    create(
        @CurrentUser('sub') userId: string,
        @Body() data: EmployeeCreateRentalDto
    ) {
        return this.rentalService.createByEmployee(userId, data);
    }

    @Get()
    findAll(@Query() query: PaginationQueryDto) {
        return this.rentalService.findAll(query);
    }

    @Get(':id')
    findById(@Param('id') rentalId: string) {
        return this.rentalService.findById(rentalId);
    }

    @Patch(':id')
    update(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
        @Body() data: UpdateRentalDto
    ) {
        return this.rentalService.updateByEmployee(rentalId, userId, data);
    }

    @Patch(':id/approve')
    approve(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
    ) {
        return this.rentalService.approveRental(rentalId, userId);
    }

    @Patch(':id/reject')
    reject(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
    ) {
        return this.rentalService.rejectRental(rentalId, userId);
    }

    @Patch(':id/cancel')
    cancel(
        @Param('id') rentalId: string,
        @CurrentUser('sub') userId: string,
    ) {
        return this.rentalService.cancelRentalByEmployee(rentalId, userId);
    }
}
