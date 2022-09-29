import prisma from '../../database';
import { CreateSessionData } from '../../types/sessions';

export async function createSession(sessionData: CreateSessionData): Promise<void> {
    await prisma.session.create({ data: sessionData });
}
