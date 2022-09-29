import sessionRepository from '../../repositories/sessions';

import { signJwt, verifyJwt } from '../../utlis/jwtUtils';
import { forbiddenError } from '../../utlis/errorUtils';

import { SessionData, TokenPayloadData } from '../../types/tokens';

export async function refreshTokenService(currentRefreshToken: string): Promise<SessionData> {
    const currentSession = await sessionRepository.findSessionByRefreshToken(currentRefreshToken);

    if (!currentSession) {
        const { payload } = verifyJwt(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);

        if (payload) {
            await sessionRepository.deleteAllUserSessions(payload.id);
        }

        throw forbiddenError('Cannot refresh session');
    }

    const { isTokenValid, isTokenExpired, payload } = verifyJwt(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    if (!isTokenValid || isTokenExpired || payload!.id !== currentSession.userId) {
        await sessionRepository.deleteSession(currentSession.id);
        throw forbiddenError('Refresh token is invalid or has expired');
    }

    const newPayload: TokenPayloadData = { id: currentSession.userId };
    const accessToken: string = signJwt(newPayload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE as string,
    });
    const refreshToken: string = signJwt(newPayload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE as string,
    });

    await sessionRepository.updateSession(currentSession.id, refreshToken);

    return { accessToken, refreshToken };
}
