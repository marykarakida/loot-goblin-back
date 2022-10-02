import { Request, Response } from 'express';

import sessionService from '../../services/sessions';

import { RefreshSessionData } from '../../types/tokens';

export async function finishSessionController(req: Request, res: Response) {
    const { refreshToken }: RefreshSessionData = req.body;

    await sessionService.finishSession(refreshToken);

    res.status(204).send();
}
