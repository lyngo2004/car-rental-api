import { Injectable } from "@nestjs/common";
import type { PrismaClientOrTx } from "prisma/prisma.service";
import { TUser, Role } from "../entity/user.entity";
import {
    UserAccount as PrismaUser,
    Role as PrismaUserRole,
} from "@prisma/client";
import { IUserRepository, TCreateUser } from "./user.repository";

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClientOrTx) { }

    toDomainUser(prismaUser: PrismaUser): TUser {
        return {
            ...prismaUser,
            role: prismaUser.role as Role,
        };
    }

    async createUser(data: TCreateUser): Promise<TUser> {
        const user = await this.prisma.userAccount.create({
            data: {
                ...data,
                role: PrismaUserRole.CUSTOMER,
            }
        });
        return this.toDomainUser(user);
    }

    async findByEmail(email: string): Promise<TUser | null> {
        const user = await this.prisma.userAccount.findUnique({
            where: { email },
        });
        return user ? this.toDomainUser(user) : null;
    }

    async findById(id: string): Promise<TUser | null> {
        const user = await this.prisma.userAccount.findUnique({
            where: { id },
        });
        return user ? this.toDomainUser(user) : null;
    }
}