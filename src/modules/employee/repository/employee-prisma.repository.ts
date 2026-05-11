import { Injectable } from "@nestjs/common";
import { IEmployeeRepository } from "./employee.repository";
import { TEmployee } from "../entity/employee.entity";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class EmployeePrismaRepository implements IEmployeeRepository {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findById(id: string): Promise<TEmployee | null> {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
        });
        if (!employee) return null;

        return {
            ...employee,
        };
    }

    async findByUserId(userId: string): Promise<TEmployee | null> {
        const employee = await this.prisma.employee.findUnique({
            where: { userId },
        });
        if (!employee) return null;

        return {
            ...employee,
        };
    }
}