import { TEmployee } from "../entity/employee.entity";

export interface IEmployeeRepository {
    findById(id: string): Promise<TEmployee | null>;
    findByUserId(userId: string): Promise<TEmployee | null>;
}