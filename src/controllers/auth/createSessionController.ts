import { Request, Response } from 'express';

import authService from '../../services/auth';

import { LoginData } from '../../types/users';
import { SessionData } from '../../types/tokens';

export async function createSessionController(req: Request, res: Response) {
    const loginData: LoginData = req.body;

    const sessionData: SessionData = await authService.createSession(loginData);

    res.status(200).send(sessionData);
}
