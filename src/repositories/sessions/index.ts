import { createSession } from './sessionRepository';

import { SessionDetail } from '../../types/sessions';

interface ISessionRepository {
    createSession(sessionData: SessionDetail): Promise<void>;
}

const sessionRepository: ISessionRepository = {
    createSession,
};

export default sessionRepository;
