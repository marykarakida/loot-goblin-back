import { NextFunction, Request, Response } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '../utlis/errorUtils';

export function errorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
    if (isAppError(err)) return res.status(errorTypeToStatusCode(err.type)).send(err.message);

    res.sendStatus(500);
}
