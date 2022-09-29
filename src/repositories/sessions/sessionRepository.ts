import prisma from '../../database';
import { CreateSessionData, Session } from '../../types/sessions';

export async function findSessionByRefreshToken(refreshToken: string): Promise<Session | null> {
    const result = await prisma.session.findUnique({ where: { refreshToken } });

    return result;
}

export async function createSession(sessionData: CreateSessionData): Promise<void> {
    await prisma.session.create({ data: sessionData });
}

export async function updateSession(id: string, refreshToken: string): Promise<void> {
    await prisma.session.update({ where: { id }, data: { refreshToken } });
}

export async function deleteSession(id: string): Promise<void> {
    await prisma.session.delete({ where: { id } });
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
}
