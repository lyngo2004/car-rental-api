import { Module } from "@nestjs/common";
import { EmployeePrismaRepository } from "./repository/employee-prisma.repository";
import { EMPLOYEE_REPOSITORY } from "./repository/employee.token";

@Module({
    providers: [
        {
            provide: EMPLOYEE_REPOSITORY,
            useClass: EmployeePrismaRepository,
        }
    ],
    exports: [EMPLOYEE_REPOSITORY],
})
export class EmployeeModule { }