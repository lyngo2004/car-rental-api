import { Inject, Injectable } from "@nestjs/common";
import type { ICustomerRepository } from "./repository/customer.repository";

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: ICustomerRepository
    ) { }

    createCustomer(userId: string, createCustomerDto: any) {
        return this.customerRepository.createCustomer(userId, createCustomerDto);
    }
}