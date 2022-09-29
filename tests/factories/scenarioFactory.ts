import prisma from '../../src/database';

export async function deleteAllData() {
    await prisma.$transaction([prisma.$executeRaw`TRUNCATE TABLE users CASCADE`, prisma.$executeRaw`TRUNCATE TABLE sessions`]);
}

export async function disconnectPrisma() {
    await prisma.$disconnect();
}
