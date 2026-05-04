import { TUser } from "../entity/user.entity";

export type TCreateUser = {
    email: string;
    passwordHash: string;
}

export interface IUserRepository {
    createUser(user: TCreateUser): Promise<TUser>;
    findByEmail(email: string): Promise<TUser | null>;
    findById(id: string): Promise<TUser | null>;
    // updateUser(id: string, user: Partial<TCreateUser>): Promise<TUser>;
    // deleteUser(id: string): Promise<void>;
}