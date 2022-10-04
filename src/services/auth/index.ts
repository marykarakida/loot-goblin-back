import { createUserService } from './createUserService';
import { createSessionService } from './createSessionService';
import { finishSessionService } from './finishSessionService';
import { getUserSessionsService } from './getUserSessionsService';
import { refreshTokenService } from './refreshTokenService';

import { Session } from '../../types/sessions';
import { SessionData } from '../../types/tokens';
import { LoginData, CreateUserData } from '../../types/users';

interface IAuthService {
    createUser(userData: CreateUserData): Promise<void>;
    createSession(sessionData: LoginData): Promise<SessionData>;
    finishSession(currentRefreshToken: string): Promise<void>;
    getUserSessions(userId: string): Promise<Session[]>;
    refreshToken(currentRefreshToken: string): Promise<SessionData>;
}

const authService: IAuthService = {
    createUser: createUserService,
    createSession: createSessionService,
    finishSession: finishSessionService,
    getUserSessions: getUserSessionsService,
    refreshToken: refreshTokenService,
};

export default authService;
