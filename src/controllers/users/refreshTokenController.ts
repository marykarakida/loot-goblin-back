import { Request, Response } from 'express';

import sessionService from '../../services/sessions';

import { SessionData, RefreshSessionData } from '../../types/tokens';

export async function refreshTokenController(req: Request, res: Response) {
    const { refreshToken }: RefreshSessionData = req.body;

    const sessionData: SessionData = await sessionService.refreshToken(refreshToken);

    res.status(200).send(sessionData);
}
