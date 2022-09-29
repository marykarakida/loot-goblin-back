import { Session } from '@prisma/client';

interface CreateSessionData {
    userId: string;
    refreshToken: string;
}

export { Session, CreateSessionData };
