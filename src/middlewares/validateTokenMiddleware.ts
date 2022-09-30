import { NextFunction, Request, Response } from 'express';

import sessionService from '../services/sessions';

import { verifyJwt } from '../utlis/jwtUtils';
import { unauthorizedError } from '../utlis/errorUtils';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!authorization?.startsWith('Bearer ') || !token) {
        throw unauthorizedError('Missing valid authorization header');
    }

    const { isTokenValid, isTokenExpired, payload } = verifyJwt(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (!isTokenValid || isTokenExpired) {
        throw unauthorizedError('Access token is invalid or has expired');
    }

    const sessions = await sessionService.getUserSessions(payload!.id);

    // user has no active sessions
    if (sessions.length === 0) {
        throw unauthorizedError('Unauthorized. Please login again.');
    }

    res.locals.userId = payload!.id;

    next();
}
