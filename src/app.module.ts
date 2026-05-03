import { Module } from '@nestjs/common';
import { CarModule } from "./modules/car/car.module";
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PrismaService } from 'prisma/prisma.service';
import { UnitOfWorkModule } from './modules/unit-of-work/unit-of-work.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

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
    ],
})
export class AppModule { }