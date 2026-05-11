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
import { EmployeeModule } from './modules/employee/employee.module';
import { RentalModule } from './modules/rental/rental.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        UnitOfWorkModule,
        UserModule,
        AuthModule,
        CustomerModule,
        CarModule,
        EmployeeModule,
        RentalModule,
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