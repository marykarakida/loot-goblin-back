import prisma from '../../database';

import { User, UserDetail } from '../../types/users';

export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { email } });

    return result;
}

export async function findUserByUsername(username: string): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { username } });

    return result;
}

export async function createUser(userData: UserDetail): Promise<void> {
    await prisma.user.create({ data: userData });
}
