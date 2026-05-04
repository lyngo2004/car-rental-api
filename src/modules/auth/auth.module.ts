import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "../auth/auth.service";
import { UnitOfWorkModule } from "../unit-of-work/unit-of-work.module";
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";

@Module({
    imports: [
        ConfigModule,
        UnitOfWorkModule,
        UserModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AccessTokenStrategy
    ],
    exports: [ AuthService]
})
export class AuthModule { }