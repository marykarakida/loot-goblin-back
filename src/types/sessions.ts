import { Session } from '@prisma/client';

type SessionDetail = Omit<Session, 'id'>;

export { Session, SessionDetail };
