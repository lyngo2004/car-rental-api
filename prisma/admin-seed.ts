import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@carrental.com';
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
    const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);

    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    const admin = await prisma.userAccount.upsert({
        where: { email: adminEmail },
        create: {
            email: adminEmail,
            passwordHash,
            role: Role.EMPLOYEE,
            employee: {
                create: {
                    fullName: 'Thiên Phú',
                    position: 'Administrator',
                    hireDate: new Date(),
                },
            },
        },
        update: {
            passwordHash,
            role: Role.EMPLOYEE,
            isActive: true,
            employee: {
                upsert: {
                    create: {
                        fullName: 'Thiên Phú',
                        position: 'Administrator',
                        hireDate: new Date(),
                    },
                    update: {
                        fullName: 'Thiên Phú',
                        position: 'Administrator',
                    },
                },
            },
        },
        include: {
            employee: true,
        },
    });

    console.log(`Seeded admin employee: ${admin.email}`);
    console.log(`Employee ID: ${admin.employee?.id}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
