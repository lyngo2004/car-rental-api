import { Controller, Get, NotFoundException, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role as RoleEnum } from "src/modules/users/entity/user.entity";
import { EmployeeService } from "./employee.service";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @UseGuards(RoleGuard)
    @Role(RoleEnum.EMPLOYEE)
    @Get('me')
    async getMe(
        @CurrentUser('sub') userId: string,
        @CurrentUser('email') email: string,
    ) {
        const employee = await this.employeeService.findByUserId(userId);

        if (!employee) {
            throw new NotFoundException('Employee profile not found');
        }

        return {
            id: employee.id,
            userId: employee.userId,
            email,
            fullName: employee.fullName,
            position: employee.position,
            hireDate: employee.hireDate,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
        };
    }
}
