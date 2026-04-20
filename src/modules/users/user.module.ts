import { Module } from "@nestjs/common";
import { UserPrismaRepository } from "./repository/user-prisma.repository";

@Module({
    providers: [
        {
            provide: 'USER_REPOSITORY',
            useClass: UserPrismaRepository,
        }
    ],
    exports: ['USER_REPOSITORY']
})
export class UserModule { }