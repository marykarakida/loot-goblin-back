import { Session } from '@prisma/client';

type CreateSessionData = Omit<Session, 'id'>;

export { Session, CreateSessionData };
