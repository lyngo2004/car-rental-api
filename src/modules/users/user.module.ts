import { Module } from "@nestjs/common";
import { UserPrismaRepository } from "./repository/user-prisma.repository";
import { ConfigModule } from "@nestjs/config";
import { USER_REPOSITORY } from "./repository/user.token";
import { UnitOfWorkModule } from "../unit-of-work/unit-of-work.module";
import { PrismaModule } from "prisma/prisma.module";
import { PrismaService } from "prisma/prisma.service";

@Module({
    imports: [
        ConfigModule,
        UnitOfWorkModule,
        PrismaModule,
    ],
    providers: [
        {
            provide: USER_REPOSITORY,
            useFactory: (prisma: PrismaService) => new UserPrismaRepository(prisma),
            inject: [PrismaService],
        }
    ],
    exports: [USER_REPOSITORY]
})
export class UserModule { }