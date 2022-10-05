import {
    findUserSessions,
    findSessionByRefreshToken,
    createSession,
    updateSession,
    deleteSession,
    deleteAllUserSessions,
} from './sessionRepository';

const sessionRepository = {
    findUserSessions,
    findSessionByRefreshToken,
    createSession,
    updateSession,
    deleteSession,
    deleteAllUserSessions,
};

export default sessionRepository;
