import prisma from '../../database';

import { Class } from '../../types/classes';

export async function findAllClasses(): Promise<Class[]> {
    const result = await prisma.class.findMany();

    return result;
}

export async function findClassByName(name: string): Promise<Class | null> {
    const result = await prisma.class.findUnique({ where: { name } });

    return result;
}
