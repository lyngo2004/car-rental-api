export type TUser = {
    id: string;
    email: string;
    passwordHash: string;
    role: Role;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    CUSTOMER = "CUSTOMER",
    EMPLOYEE = "EMPLOYEE",
}