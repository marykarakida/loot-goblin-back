import { Request, Response } from 'express';

import authService from '../../services/auth';

import { SessionData, RefreshSessionData } from '../../types/tokens';

export async function refreshTokenController(req: Request, res: Response) {
    const { refreshToken: currentRefreshToken }: RefreshSessionData = req.body;

    const sessionData: SessionData = await authService.refreshToken(currentRefreshToken);

    res.status(200).send(sessionData);
}
