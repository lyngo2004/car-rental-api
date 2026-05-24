import { Module } from "@nestjs/common";
import { EmployeePrismaRepository } from "./repository/employee-prisma.repository";
import { EMPLOYEE_REPOSITORY } from "./repository/employee.token";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { UserModule } from "../users/user.module";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [UserModule, PrismaModule],
    controllers: [EmployeeController],
    providers: [
        {
            provide: EMPLOYEE_REPOSITORY,
            useClass: EmployeePrismaRepository,
        },
        EmployeeService,
    ],
    exports: [EMPLOYEE_REPOSITORY, EmployeeService],
})
export class EmployeeModule { }
