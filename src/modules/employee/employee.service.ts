import { Inject, Injectable } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "./repository/employee.token";
import type { IEmployeeRepository } from "./repository/employee.repository";

@Injectable()
export class EmployeeService {
    constructor(
        @Inject(EMPLOYEE_REPOSITORY)
        private readonly employeeRepository: IEmployeeRepository,
    ) { }

    findByUserId(userId: string) {
        return this.employeeRepository.findByUserId(userId);
    }
}
