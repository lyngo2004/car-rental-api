import { TCustomer } from "../entity/customer.entity";

export type TCreateCustomer = {
    fullName: string;
    phone: string;
    address: string;
    driverLicense: string;
    dateOfBirth?: Date | string | null;
}

export interface ICustomerRepository {
    createCustomer(userId: string, customer: TCreateCustomer): Promise<TCustomer>;
    findById(id: string): Promise<TCustomer | null>;
    findByUserId(userId: string): Promise<TCustomer | null>;
    // updateCustomer(id: string, customer: Partial<TCreateCustomer>): Promise<TCustomer>;
    // deleteCustomer(id: string): Promise<void>;
}