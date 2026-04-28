import { PrismaService } from "prisma/prisma.service";
import { Role, TUser } from "../entity/user.entity";
import {
    UserAccount as PrismaUser,
    Role as PrismaUserRole,
} from "@prisma/client";
import { IUserRepository, TCreateUser } from "./user.repository";

export class UserPrismaRepository implements IUserRepository {
    constructor(private prisma: PrismaService) { }

    toDomainUser(prismaUser: PrismaUser): TUser {
        return {
            ...prismaUser,
            // password: prismaUser.passwordHash,
            role: prismaUser.role as Role,
        };
    }

    async createUser(data: TCreateUser): Promise<TUser> {
        const user = await this.prisma.userAccount.create({
            data: {
                ...data,
                passwordHash: data.password,
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