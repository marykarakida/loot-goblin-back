import { createSessionService } from './createSessionService';
import { finishSessionService } from './finishSessionService';
import { getUserSessionsService } from './getUserSessionsService';
import { refreshTokenService } from './refreshTokenService';

import { Session } from '../../types/sessions';
import { SessionData } from '../../types/tokens';
import { LoginData } from '../../types/users';

interface ISessionService {
    createSession(sessionData: LoginData): Promise<SessionData>;
    finishSession(currentRefreshToken: string): Promise<void>;
    getUserSessions(userId: string): Promise<Session[]>;
    refreshToken(currentRefreshToken: string): Promise<SessionData>;
}

const sessionService: ISessionService = {
    createSession: createSessionService,
    finishSession: finishSessionService,
    getUserSessions: getUserSessionsService,
    refreshToken: refreshTokenService,
};

export default sessionService;
