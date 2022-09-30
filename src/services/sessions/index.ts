import { createSessionService } from './createSessionService';
import { getUserSessionsService } from './getUserSessionsService';
import { refreshTokenService } from './refreshTokenService';

import { Session } from '../../types/sessions';
import { SessionData } from '../../types/tokens';
import { LoginData } from '../../types/users';

interface ISessionService {
    createSession(sessionData: LoginData): Promise<SessionData>;
    getUserSessions(userId: string): Promise<Session[]>;
    refreshToken(currentRefreshToken: string): Promise<SessionData>;
}

const sessionService: ISessionService = {
    createSession: createSessionService,
    getUserSessions: getUserSessionsService,
    refreshToken: refreshTokenService,
};

export default sessionService;
