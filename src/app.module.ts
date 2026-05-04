import { Module } from '@nestjs/common';
import { CarModule } from "./modules/car/car.module";
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from 'prisma/prisma.service';
import { UnitOfWorkModule } from './modules/unit-of-work/unit-of-work.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AccessTokenStrategy } from './modules/auth/strategies/access-token.strategy';
import { AcessTokenGuard } from './common/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UnitOfWorkModule,
        UserModule,
        AuthModule,
        CustomerModule,
        CarModule,
        PrismaModule,
    ],
    providers: [
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: AcessTokenGuard,
        },
    ],
})
export class AppModule { }