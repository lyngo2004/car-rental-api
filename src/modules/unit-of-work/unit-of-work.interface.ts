import { ICustomerRepository } from "../customer/repository/customer.repository";
import { IUserRepository } from "../users/repository/user.repository";

export interface IUnitOfWork {
  run<T>(work: (uow: IUnitOfWorkContext) => Promise<T>): Promise<T>;
}

export interface IUnitOfWorkContext {
  users: IUserRepository;
  customers: ICustomerRepository;
}

