import { createSessionService } from './createSessionService';

import { LoginData } from '../../types/users';
import { SessionData } from '../../types/tokens';

interface ISessionService {
    createSession(sessionData: LoginData): Promise<SessionData>;
}

const sessionService: ISessionService = {
    createSession: createSessionService,
};

export default sessionService;
