import { findSessionByRefreshToken, createSession, updateSession, deleteSession, deleteAllUserSessions } from './sessionRepository';

import { CreateSessionData, Session } from '../../types/sessions';

interface ISessionRepository {
    findSessionByRefreshToken(refreshToken: string): Promise<Session | null>;
    createSession(sessionData: CreateSessionData): Promise<void>;
    updateSession(id: string, refreshToken: string): Promise<void>;
    deleteSession(id: string): Promise<void>;
    deleteAllUserSessions(userId: string): Promise<void>;
}

const sessionRepository: ISessionRepository = {
    findSessionByRefreshToken,
    createSession,
    updateSession,
    deleteSession,
    deleteAllUserSessions,
};

export default sessionRepository;
