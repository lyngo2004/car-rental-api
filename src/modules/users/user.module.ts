import { Module } from "@nestjs/common";
import { UserPrismaRepository } from "./repository/user-prisma.repository";
import { ConfigModule } from "@nestjs/config";
import { USER_REPOSITORY } from "./repository/user.token";
import { UnitOfWorkModule } from "../unit-of-work/unit-of-work.module";

@Module({
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: UserPrismaRepository,
        }
    ],
    exports: [USER_REPOSITORY]
})
export class UserModule { }