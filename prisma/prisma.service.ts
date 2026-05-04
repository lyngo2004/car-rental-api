import { Prisma, PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

export type PrismaTransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

export type PrismaClientOrTx = PrismaClient | PrismaTransactionClient;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}