import { createSession } from './sessionRepository';

import { CreateSessionData } from '../../types/sessions';

interface ISessionRepository {
    createSession(sessionData: CreateSessionData): Promise<void>;
}

const sessionRepository: ISessionRepository = {
    createSession,
};

export default sessionRepository;
