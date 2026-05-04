import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaUnitOfWork } from './prisma-unit-of-work';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: 'IUnitOfWork',
            useClass: PrismaUnitOfWork,
        },
    ],
    exports: ['IUnitOfWork'],
})
export class UnitOfWorkModule { }
