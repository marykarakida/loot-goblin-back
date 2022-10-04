import { Request, Response } from 'express';

import authService from '../../services/auth';

import { RefreshSessionData } from '../../types/tokens';

export async function finishSessionController(req: Request, res: Response) {
    const { refreshToken }: RefreshSessionData = req.body;

    await authService.finishSession(refreshToken);

    res.status(204).send();
}
