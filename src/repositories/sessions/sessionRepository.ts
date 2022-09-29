import prisma from '../../database';
import { SessionDetail } from '../../types/sessions';

export async function createSession(sessionData: SessionDetail): Promise<void> {
    await prisma.session.create({ data: sessionData });
}
