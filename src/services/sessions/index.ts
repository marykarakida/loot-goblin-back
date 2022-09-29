import { createSessionService } from './createSessionService';
import { refreshTokenService } from './refreshTokenService';

import { LoginData } from '../../types/users';
import { SessionData } from '../../types/tokens';

interface ISessionService {
    createSession(sessionData: LoginData): Promise<SessionData>;
    refreshToken(oldRefreshToken: string): Promise<SessionData>;
}

const sessionService: ISessionService = {
    createSession: createSessionService,
    refreshToken: refreshTokenService,
};

export default sessionService;
