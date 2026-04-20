import { Module } from '@nestjs/common';
import { CarModule } from "./modules/car/car.module";
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
    imports: [
        UserModule,
        CustomerModule,
        CarModule,
        PrismaModule
    ],

})
export class AppModule { }