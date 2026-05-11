// prisma-unit-of-work.ts
import { Injectable } from '@nestjs/common';
import { IUnitOfWork, IUnitOfWorkContext } from './unit-of-work.interface';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerPrismaRepository } from '../customer/repository/customer-prisma.repository';
import { UserPrismaRepository } from '../users/repository/user-prisma.repository';
import { EmployeePrismaRepository } from '../employee/repository/employee-prisma.repository';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(private readonly prisma: PrismaService) { }

  async run<T>(work: (ctx: IUnitOfWorkContext) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      return work({
        users: new UserPrismaRepository(tx),
        customers: new CustomerPrismaRepository(tx),
      });
    });
  }
}