import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "../auth/auth.service";
import { UnitOfWorkModule } from "../unit-of-work/unit-of-work.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        ConfigModule,
        UnitOfWorkModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
    exports: [ AuthService]
})
export class AuthModule { }